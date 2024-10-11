
import { bookType } from "./bookType";
import mongoose from "mongoose";

const bookSchema= new mongoose.Schema<bookType>(
    {
        title:{
            type:String,
            required:true
        },
author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
coverImage:{
    type:String,
    required:true
},
file:{
    type:String,
    required:true,
},

},{
    timestamps:true
})
export default mongoose.model('book',bookSchema)