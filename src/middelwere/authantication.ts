import { Request,Response,NextFunction } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface authrequest extends Request{
userId:string
}
const authantication=async(req:Request,res:Response,next:NextFunction)=>{
    const token= req.header('Authorization')
    if(!token){

        return next(createHttpError(401,"token is not provided!"))
    }
   const providedToken= token.split(" ")[1]

 try{
    const decoded=   verify(providedToken,config.jwtsecuritytoken as string)
 console.log("decodedVal---->",decoded)
 const _req= req as authrequest
 _req.userId  =decoded.sub as string
 next()
 }
 catch(err){
 console.log(err)   
    next(createHttpError(401,'token exprired !'))
 }

}

export default authantication