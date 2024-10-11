import Mongoose from 'mongoose'
import { config } from './config'


const connectionDb=async()=>{
    try{

        Mongoose.connection.on('connected',()=>{
            console.log('database Successfuliy connected !')
        })
        Mongoose.connection.on('error',(err)=>{
            console.log('Error connecting To database',err)
        })

        Mongoose.connect(config.databaseUrl as string)
    }
    catch(err){
        console.log('failde to connect database',err)
        process.exit(1)
    }


}
export default connectionDb