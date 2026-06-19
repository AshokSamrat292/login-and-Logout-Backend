import { User } from "../models/user.model.js";
import { Apierror } from "../utils/ApiError.js"
import Jwt from 'jsonwebtoken'

export const verifyJwt = async (req , _, next )=>{
  try {
    console.log("we reached ")
   console.log(req.cookies) ; 
   const Token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "")
   if(!Token){
    throw new Apierror(401 , "Unauthorized request") ; 
 }
   console.log("we reached here 1")
   const DecodeToken = Jwt.verify(Token ,process.env.ACCESS_TOKEN_SECRET ) ; 
   console.log("we reached here 2")
   const user = await User.findById(DecodeToken?._id).select("-password -refreshToken") 
   console.log("we reached here 3")
   if(!user){
    throw new Apierror(401 , "Invalid Access")

   }
   req.user = user 
   console.log("I created the user ")
   next() 
   console.log("we reached here 4")
   } catch (error) {
     throw new Apierror(401 , "invalid access token") 
  }
}