import { Apierror } from "../utils/ApiError.js";
import { asynchandler } from "../utils/Asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadFileonCloudinary } from "../utils/cloudinary.js";
import { Apiresponse } from "../utils/Apirespone.js";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessTokens = async(userId)=>{
    try {
        const userInstace = await User.findById(userId) 
        const refreshToken = userInstace.generateRefreshToken()
        
        const accessToken = userInstace.generateAccessToken() 
        
        userInstace.refreshToken = refreshToken ; 
        await userInstace.save({ validateBeforeSave: false } )
        
        return {accessToken , refreshToken} 
    } catch (error) {
        throw new Apierror(500 , error?.message ||"error while creating tokens")
    }
}

const registerUser = asynchandler(async (req , res)=>{
   // get details from the user 
   // validation - any field should not be empty if it is required 
   // existance of user - may ber user already exist - username 
   // now we have images - avatar we upload it to cloudinary once uploaded in the local path through middelware multer 
   // after uploading i will take the link of url and save it to the database 
   // now i have all the info i will directly create an object to keep all these details in the database 
   // once uploaded the details i will take the response and remove password and refresh token 
   // and then return the response to the user 
  
   //1 . get details except any file 
   console.log("inside the register user ")
   const {fullName , email , password , username } = req.body  // from here we can get all those data valuse not any file type things like images , video 
//    console.log("All good upto this 1")
//2. validation - if empty 
   let DataField = [fullName , email , password , username] ; 

   DataField.forEach((data)=>{
     console.log(data)
    if((data).trim() === "") res.status(400).json(
     new Apierror(400 , "All fields are required ") 
    )
   
   })
   console.log("All good upto this 2")
// 3. checking if user already exists 
   const existuser = await User.findOne(
     {
        $or : [{username} , {email}]
     }
   )
   console.log("All good upto this existuser")
   if(existuser) {
    throw new Apierror(409 , "user already exist please login ") 
   }
   // file handling since we have used multer as a middleware it provide one class that is files 
  const avatarlocalpath =  req.files?.avatar[0]?.path ; 
      console.log(avatarlocalpath)
const coverImagelocalpath = req.files?.coverimage?.[0]?.path || "";
  if(!avatarlocalpath) throw new Apierror(400 , "Avatar is needed") ; 

 const Avatar = await uploadFileonCloudinary(avatarlocalpath) ; 
   
 const Coverimage = coverImagelocalpath ? await uploadFileonCloudinary(coverImagelocalpath) : null ; 
 console.log(Avatar) ; 
 console.log(Coverimage) ; 
 if(!Avatar) {
    throw new Apierror(400 , "avatar is needed") ; 
 }

// now last upload it on db 
console.log("All good before  creation ")
let user ; 
if(Coverimage != null){
 user = await User.create({
    fullName , 
    
    Avatar : Avatar.url , 
    coverImage :  Coverimage.url , 
    username : username.toLowerCase(), 
    password , 
    email
})
}
else {
     user = await User.create({
    fullName , 
    
    Avatar : Avatar.url , 
    coverImage : "", 
    username : username.toLowerCase(), 
    password , 
    email
}) 
}


console.log("All good after  creation ")
// here we are seeing either the user created or not if it's create we are user.select("here we will pass what are the things we do not required because by default everything is selected ")
const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!userCreated){
    throw new Apierror(500 , "something went wrong while registering ") 
}

return res.status(200).json(
    new Apiresponse(200 , userCreated) 

)
})


const LoginUser = asynchandler(async (req , res)=>{
   // req.body user details 
   //username or eamail & password 
   // user.find() username or email and then if that's there match with password 
   // once validation generate access and refresh token 
   // send cookies 
  const {username ,email ,  password}  = req.body 
   if(username?.trim() === ""  && email?.trim() === "" ) {
       throw new Apierror(400 , " !Username or Email  required")
   }
   if( password?.trim() === "") {
       throw new Apierror(400 , " password required")
   }
   const ExistUser = await User.findOne({
    $or : [{username} , {email}]
   })
   if(!ExistUser){
     throw new Apierror(404 , "user not found please sign in ")
   }
   if(!(await ExistUser.isPasswordCorrect(password))){
     throw new Apierror(401 , "invalid User credential!")
    }
    
 const { accessToken ,refreshToken }  = await generateRefreshAndAccessTokens(ExistUser._id) 
 const loggedInUser = await User.findById(ExistUser._id).select("-password -refreshToken")
 console.log(accessToken , refreshToken) ; 
   const option = {
     httpOnly :true ,   // here http true and secure true means only server can modify the cookies
     secure : true  ,
    sameSite: "none"
   }
   return res
   .status(200)
   .cookie("accessToken" , accessToken , option)
   .cookie("refreshToken" , refreshToken , option)
   .json(
       new Apiresponse(200 , 
        {
            user : loggedInUser , refreshToken , accessToken 
        }, 
        " !user login succesfully "
       ))

})

const logOutuser = asynchandler( async (req , res)=>{
     console.log("we reached here 5")
     console.log((req.user)._id )
   await User.findByIdAndUpdate(
    (req.user)._id , 
    {
        $set : {refreshToken : undefined}    // here we setting refresh token undefined means we are deleting this part from the user database 
    } , 
    {
        new : true  // means this instance will show the updates user details 
    }
   )
   console.log("we reached here 6")
    const option = {
     httpOnly :true ,   // here http true and secure true means only server can modify the cookies
     secure : true ,
    sameSite: "none"
   }
console.log("we reached here 7") 
   
        try {
      return res.status(200)
              .clearCookie("accessToken" , option)
              .clearCookie("refreshToken" , option)
              .json(
                new Apiresponse(200 ,{} ,  "user logged out successfully")  
              )
        } catch (error) {
            console.log(error?.message|| "something !!")
        }
})

const AccessrefreshToken = asynchandler( async (req , res)=>{
   const oldrefreshToken = req.cookies.refreshToken || req.body.refreshToken 
   if(!oldrefreshToken){
    throw new Apierror(401 , "unauthorized request") ; 

   }
   const decodeToken = jwt.verify(oldrefreshToken , process.env.REFRESH_TOKEN_SECRET) ; 
   const currentUser = await User.findById(decodeToken._id) ; 
   if(!currentUser){
          throw new Apierror(401 , "Invalid refresh token ") ;
   }
   if(oldrefreshToken != currentUser.refreshToken){
     throw new Apierror(401 , "refresh token is expired or use ") ;
   }
   const {accesToken , refreshToken} = generateRefreshAndAccessTokens(currentUser._id) ; 
   const option = {
      httpOnly : true , 
      secure : true ,
     sameSite: "none"
   }
   return res.status(200)
             .cookie('accesToken' , accesToken , option) 
             .cookie('refreshToken' , refreshToken , option)
             .json(
                new Apiresponse(201 , {accesToken , refreshToken} , "AccessToken generated successfully")
             )
})

const changePassword = asynchandler( async (req , res )=>{
     const {oldPassword , newPassword } = req.body 
     const user = await User.findById(req.user._id) 
     if(!user){
        throw new Apierror(400 , "unauthorized")
        }
   const isPasswordCorrect = await  user.isPasswordCorrect(oldPassword) 
   if(!isPasswordCorrect) {
    throw new Apierror(401 , "invalid password ") ; 

   }
   user.password = newPassword 
   await  user.save({validateBeforeSave : false}) 
   return res.status(200).json(
     new Apiresponse(201 , {} ,"password changed succesfully " )
   )
})

const  getCurrentUser = asynchandler( async (req , res )=>{
     const user = await User.findById((req.user)._id).select("-password -refreshToken") 
     if(!user){
        throw new Apierror(400 , "unauthorized") 
    }
    return res.status(200).json(
        new Apiresponse(200 , {user} , "okkk")
    )

})

const updateAccountDetails = asynchandler( async (req , res)=>{
    const {fullName , email} = req.body
    if(fullName?.trim() === "" || email?.trim() === ""){
        throw new Apierror(400 , "All fields are required") ; 

    }


    const user = User.findByIdAndUpdate(
        req.user._id , 
        {
            $set : {
                fullName , email 
            }
        } , 
        {
            new : true   // here new is true means the user it returns will be updated user 
        }
    ).select("-password")
    return res.status(200).json(
        new Apiresponse(201 , user , "Account Updated successfully ")
    )
})

const updateAvatar = asynchandler (async (req , res) =>{
      
      const avatarlocalpath = req.file
      if(!avatarlocalpath){
        throw new Apierror(401 , "Avatar file is needed")
      }
      let response = await  uploadFileonCloudinary(avatarlocalpath)
      if(!response){
        throw new Apierror(500 , "error while uploading on cloudinary ")
      }
      const user = await User.findByIdAndUpdate(req.user._id , 
        {
            $set : {Avatar : response.url} 
        }, 
        {
            new : true 
        }

      ).select("-password") ; 
    
      return res.status(200).json(
        new Apiresponse(201 , user ,"Avatar file updated successfully " )
      )

})

const updateCoverImage = asynchandler (async (req , res) =>{
      
      const CoverImagelocalpath = req.file
      if(!CoverImagelocalpath){
        throw new Apierror(401 , "CoverImage file is needed")
      }
      let response = await  uploadFileonCloudinary(CoverImagelocalpath)
      if(!response){
        throw new Apierror(500 , "error while uploading on cloudinary ")
      }
      const user = User.findByIdAndUpdate(req.user._id , 
        {
            $set : {coverImage : response.url} 
        }, 
        {
            new : true 
        }

      ).select("-password") ; 
    
      return res.status(200).json(
        new Apiresponse(201 , user ,"CoverImage file updated successfully " )
      )

})

export {registerUser , LoginUser , logOutuser  , AccessrefreshToken , changePassword , getCurrentUser , updateAccountDetails , updateAvatar , updateCoverImage}  
