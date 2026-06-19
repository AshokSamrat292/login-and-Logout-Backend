import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt" 
import { Apierror } from "../utils/ApiError.js";
const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true , 
        unique : true , 
        lowercase : true,
        trim :true ,
        index : true  // to make the searchable optimised 
    } , 
     email : {
        type : String , 
        required : true , 
        unique : true , 
    } , 
     fullName: {
        type : String , 
        required : true 
    } ,
    Avatar : {                 // cloudinary url 
        type : String , 
        required : true 
        
    }, 
     coverImage : {                // cloudinary url 
        type : String 
         }, 
     password :
     {
        type : String , 
        required: true 
     },
     refreshToken :{
       type : String 
     }, 
     watchHistory : [{
    type : mongoose.Schema.Types.ObjectId , 
    ref : 'Video'
     }]
} , {timestamps:true}) ; 

// this we use to hash our password 
userSchema.pre("save" , async function () { 
    if(! this.isModified("password")) return   // pre means just before any function perform like just before save , can be delete , update , validate
    this.password = await bcrypt.hash(this.password , 10)   // here we didnot used arrow function becuse that doesnot take reference where as function can pass the references 
})                                                  // here 10 means we hash upto 10 round 

// now to check the password either it true or not 

userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return  await bcrypt.compare(password , this.password) ;
    } catch (error) {
        throw new Apierror(500 , "error while comparing ")
    } 

   
}

userSchema.methods.generateAccessToken = function (){
  return  Jwt.sign({
        _id : this._id , 
        email : this.email , 
        username : this.username , 
        fullName : this.fullName 
    }, 
     process.env.ACCESS_TOKEN_SECRET , 
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
})

}

userSchema.methods.generateRefreshToken = function() {
  return  Jwt.sign({
        _id : this._id , 
        email : this.email 
    }, 
     process.env.REFRESH_TOKEN_SECRET , 
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
}) 

}
export const User = mongoose.model('User' ,userSchema ) ; 

// use cloudinary for handle video image file etc ... 
// multer 

// for authentication we use jwt  and for password hashing we use bcrypt
// now we will see the importance of refresh token and access token in authentication  and how we can use it in our project
// access token is short lived token whenever one user once login then we will generate access token and refresh token 
// whenever user make any request to the server we will check the access token if it is valid then we will allow the user
//  to access the resource if it is not valid then we will check the refresh token if refresh token is valid then we will
//  generate new access token and refresh token and send it to the user and update the refresh token in the database
// refresh token is we can say it is session token it is long lived token and we can use it to generate new access token whenever access token is expired without asking the user to login again
// so try to keep access token in the memory of the client side and refresh token in the http only cookie 
// so that it is more secure and can not be accessed by the client side javascript  
// and also we can set the expiry time of the refresh token to a long time like 7 days or 30 days so that user can stay login for a long time without asking to login again