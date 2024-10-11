import app from "./src/app";
import { config } from "./src/config/config";
import connectionDb from "./src/config/db";
const Startserver=async()=>{
   await connectionDb() 
    const Port= config.port||3000

    app.listen(Port,()=>{
        console.log(`Server will Start on ${Port}`)
    })

}
Startserver()