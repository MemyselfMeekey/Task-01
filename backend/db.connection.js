import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config()

mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.MONGODB_DB_NAME,
    autoCreate:true,
    autoIndex:true
}).then((res)=>{
    console.log("database is connected")
})
.catch((err)=>{
    console.log("Error connecting database",err)
    throw{message:"DB server not running ",code:500}
})