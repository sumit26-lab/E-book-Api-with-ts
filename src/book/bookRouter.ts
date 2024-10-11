import express from 'express'
import multer from "multer";
import path from 'path';
const bookRouter= express.Router()
import { createBook,updateBook } from './bookControler';
import authantication from '../middelwere/authantication';


const upload= multer({
    dest: path.resolve(__dirname,'../public/data/uplods'),
    
    limits:{fieldSize:3e7}
})
bookRouter.post('/',authantication,upload.fields([
    {name:"coverImage",maxCount:1},
    {name:"file",maxCount:1}
]),createBook)

bookRouter.patch('/:id',authantication,upload.fields([
    {name:"coverImage",maxCount:1},
    {name:"file",maxCount:1}
]),updateBook)
export default bookRouter