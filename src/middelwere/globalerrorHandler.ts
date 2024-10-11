import  { NextFunction,Request,Response } from 'express'
import {HttpError} from 'http-errors';
import { config } from '../config/config'

const golbalerrorHandler=((error:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode=error.status||500;
    
         res.status(statusCode).json({
            message: error.message,
            errorStack:config.env=="devlopement"? error.stack:""
        })
    })

    export default golbalerrorHandler