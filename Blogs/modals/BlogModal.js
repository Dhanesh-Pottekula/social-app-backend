import mongoose from "mongoose";
const Schema = mongoose.Schema

const blogSchema = Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        maxlength:100,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const blogModal = mongoose.model("Blog",blogSchema)
