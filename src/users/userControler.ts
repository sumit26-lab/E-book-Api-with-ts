import { Request,Response,NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign}from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userType";

export const createUser=async(req:Request,res:Response,next :NextFunction)=>{
    const {username,password,email}=req.body
    console.log(req.body)
    if(!username|| !password ||!email){
const error= createHttpError(400,'All filde are Requrire-!')
return next(error)
    }
let newUser:User
try{
const user= await userModel.findOne({email})
  if(user){
   const error= createHttpError(400,'User Allready Exits. this Email!')
   return next(error)
  }
 const hasspassword= await bcrypt.hash(password,10)

 newUser=await userModel.create({
    username:username,
    email:email,
    password:hasspassword,
    
 })}catch(err){
    console.log(err)
    const error= createHttpError(500,'Error while Createing User')
    return next(error)

}
  try{

      const token = sign({sub:newUser._id},config.jwtsecuritytoken as string,{expiresIn:'1h'})
      res.status(200).json({accessToken:token})
  }catch(err){
    const error = createHttpError(500,'Error while Create jwt Sign--')
    return next(error)
  }


    
}


export const userLogin=async(req:Request,res:Response,next:NextFunction)=>{
    const {identifier,password}=req.body
     
    if(!identifier|| !password){
const error= createHttpError(400,'All filde are Requrire-!')
return next(error)
    }
    let user:User|null

    try{
        user=await userModel.findOne({
            $or:[

            
           { email:identifier},{username: identifier}
            ]
        })
        console.log(user)
        if(!user){
            const error= createHttpError(401,'user not found-!')
             return next(error)
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            const error= createHttpError(400,'user password incorrect')
             return next(error)
        }

    }
    catch(err){
        
        const error= createHttpError(400,'internal Server Error !')
        return next(error)

    }
    try{

        const token = sign({sub:user._id},config.jwtsecuritytoken as string,{expiresIn:'1h'})
        res.status(200).json({accessToken:token})
    }catch(err){
      const error = createHttpError(500,'Error while Create jwt Sign--')
      return next(error)
    }
  
}
