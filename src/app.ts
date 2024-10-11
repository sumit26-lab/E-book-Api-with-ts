import express from 'express'
//import createHttpError from  'http-errors'
import golbalerrorHandler from './middelwere/globalerrorHandler'
import userRouter from './users/userRoute'
import bookRouter from './book/bookRouter';

const app= express()

app.get('/',(req,res)=>{
//    const error =createHttpError(400,'some thing went Wrong!')
//    throw error
     res.status(200).json({status:true,message:"data will get sucessfuliy"})

})
app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/book',bookRouter)

app.use(golbalerrorHandler)


export default app