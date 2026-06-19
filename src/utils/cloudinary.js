import { v2 as cloudinary } from "cloudinary" 
import fs from "fs"
import { Apierror } from "./ApiError.js";
  cloudinary.config({ 
        cloud_name :  process.env.cloud_name, 
        api_key : process.env.api_key, 
        api_secret : process.env.api_secret 
    });
 // upload file on cloudinary 

 const uploadFileonCloudinary = async (localFilePath)=>{
    if(!localFilePath) return null ; 
    try {
        let response = await cloudinary.uploader.upload(localFilePath , {resource_type:"auto"}) ; 
        fs.unlinkSync(localFilePath) ; 
        return response 
    } catch (error) {
        fs.unlinkSync(localFilePath) // we remove the locally saved temporary file as the upload operation got failed 
        return null ; 
    }
 }

 const destroyfromCloudinary = async (public_id)=>{
    if(!public_id) return null ; 
    try {
        let response = await cloudinary.uploader.destroy(public_id) ; 
        return response ; 
    }
    catch(error){
      throw new Apierror(500 , "internal error while destroying the file ")
    }
 }

 export {uploadFileonCloudinary} 

    
    

