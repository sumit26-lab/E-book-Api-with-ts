import { User } from "../users/userType";

export interface bookType{
    _id:string,
    title:string,
    author:User,
    gener:string,
    coverImage:string,
    file:string,
    createdAt:Date,
    updatedAt:Date

}