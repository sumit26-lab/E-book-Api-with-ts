import mongoose from "mongoose";
import {User} from './userType'
const userSchema=new mongoose.Schema<User>(
    {
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        required:true,
        unique:true,
        type:String
    }, password:{
        required:true,
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model<User>('User',userSchema)