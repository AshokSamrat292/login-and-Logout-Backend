import mongoose from "mongoose";
import mongoAggregatePaginate   from "mongoose-paginate-v2";
const VideoSchema = new mongoose.Schema({
    videoFile: {
        type : String , 
        required: true , 
        unique: true 
    }, 
     thumbnail: {
        type : String , 
        required: true , 
        unique: true 
    }, 
     title: {
        type : String , 
        required: true , 
        unique: true 
    }, 
     description: {
        type : String , 
        required: true , 
        unique: true 
    }, 
     Duration: {
        type : Number , 
        required: true , 
        unique: true 
    }, 
      views: {
        type : Number , 
        default : 0 
    },
    isPublished :{
        type : Boolean , 
        default : true 
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    }

} , {timestamps: true }) 
VideoSchema.plugin(mongoAggregatePaginate)
export const Video = mongoose.model('Video' , VideoSchema)