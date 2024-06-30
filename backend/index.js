import http from "http"
import express from "express"
import "./db.connection.js"
import router from "./src/router.js"
import { MongooseError } from "mongoose"
import cors from "cors"

const app=express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use('',router)

app.use((req,res,next)=>{
    next({code:404,messsage:"not found",detail:""})
})



const httpServer=http.createServer(app)

httpServer.listen("3000",'127.0.0.1',(err)=>{
    if(!err){
        console.log("Sever started successfuly")
    }
    else{
        console.log("error",err)
    }
})