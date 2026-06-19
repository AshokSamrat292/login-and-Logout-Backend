import { Router } from "express";
import { registerUser , LoginUser, logOutuser, AccessrefreshToken, getCurrentUser, changePassword } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/auth.js";
import { User } from "../models/user.model.js";

const User_router = Router() ; 

User_router.route("/register").post( 
   upload.fields([
    {
     name : "avatar" , 
     maxCount: 1 
   }
   ,{
     name: "coverimage" , 
     maxCount :1 
   }
]) , registerUser)
User_router.route("/login").post(LoginUser) ; 
User_router.route("/logOut").post( verifyJwt , logOutuser) ; 
User_router.route("/refresh_accesToken").post(AccessrefreshToken)
User_router.route("/getCurrentUser").get(verifyJwt , getCurrentUser)
User_router.route("/changePassword").post(verifyJwt , changePassword)
export {User_router} 