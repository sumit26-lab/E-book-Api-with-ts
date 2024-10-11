import { Request,Response,NextFunction } from "express";
import path from "node:path";
import cloudinary from "./cloudner";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs"
import { authrequest } from "../middelwere/authantication";

export const createBook=async(req:Request,res:Response,next :NextFunction)=>{
    const {title,gener}=req.body

    try{
        const files =req.files as {[fielname:string]:Express.Multer.File[]}
        //uploadCoverImage-------->
        const coverImageMimeType=files.coverImage[0].mimetype.split("/").at(-1)
        const FileName= files.coverImage[0].filename
        const bookfilePath=path.resolve(__dirname,'./../public/data/uplods',FileName)   
        const uploadicoverImage=await cloudinary.uploader.upload(bookfilePath,{
        filename_override:FileName,
        folder:"book-cover",
        format:coverImageMimeType
        })
      
        //-------->uplods file
        const fileMimeType=files.file[0].mimetype.split("/").at(-1)
        const Book_filename= files.file[0].filename
        const file_path=path.resolve(__dirname,'./../public/data/uplods',Book_filename)   
        const uploadfile=await cloudinary.uploader.upload(file_path,{
           resource_type:'raw',
        filename_override:Book_filename,
        folder:"book-pdf",
        format:fileMimeType
        })
       const _req=req as authrequest
        console.log('upload',uploadicoverImage,uploadfile)
        const book= await bookModel.create({
            author:_req.userId,
            coverImage:uploadicoverImage.secure_url,
            file:uploadfile.secure_url,
            gener:gener,
            title:title

          
        })
        await fs.promises.unlink(file_path)
        await fs.promises.unlink(bookfilePath)
        res.json({id:book._id})
       
    }catch(err){
        console.log(err)
        return next(createHttpError(500,'Error while upload the file--!'))

    }


    
}

export const updateBook=async(req:Request,res:Response,next :NextFunction)=>{
    const {title,gener}=req.body
    const {id}= req.params
    
    try{
         const Book= await bookModel.findOne({_id:id})
         if(!Book){
            return next(createHttpError(403,'book not found this user'))

         }
       const _req=req as authrequest

         if(Book.author.toString()!==_req.userId){
            return next(createHttpError(403,'you cannot update other book'))

         }
         



        const files =req.files as {[fielname:string]:Express.Multer.File[]}
        //uploadCoverImage-------->
        let completcoverImage=""

        if(files.coverImage){
        const coverImageMimeType=files.coverImage[0].mimetype.split("/").at(-1)
        const FileName= files.coverImage[0].filename
        completcoverImage=FileName
        const bookfilePath=path.resolve(__dirname,'./../public/data/uplods',FileName)
         const uploadimage=await cloudinary.uploader.upload(bookfilePath,{
            filename_override:completcoverImage,
            folder:"book-cover",
            format:coverImageMimeType
            })   
            completcoverImage=uploadimage.secure_url;
        await fs.promises.unlink(bookfilePath)

        }
        let completfileImage=""
        //-------->uplods file
       if(files.file){
           const fileMimeType=files.file[0].mimetype.split("/").at(-1)

           const Book_filename= files.file[0].filename
           completfileImage=Book_filename
           const file_path=path.resolve(__dirname,'./../public/data/uplods',Book_filename)   
       
           const uploadfile=await cloudinary.uploader.upload(file_path,{
            resource_type:'raw',
         filename_override:completfileImage,
         folder:"book-pdf",
         format:fileMimeType
         })
         await fs.promises.unlink(file_path)
        
         completfileImage=uploadfile.secure_url
    }
        
        
        console.log('upload',completcoverImage,completfileImage)
        const book= await bookModel.findOneAndUpdate(
            {_id:Book._id},
            {author:_req.userId,
            coverImage:completcoverImage,
            file:completfileImage,
            gener:gener,
            title:title
            }

          
        )
        
        res.send('ok')
       
    }catch(err){
        console.log(err)
        return next(createHttpError(500,'Error while upload the file--!'))

    }


    
}
