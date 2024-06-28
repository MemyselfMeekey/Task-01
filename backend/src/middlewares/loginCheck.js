import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import AuthSvc from "../service.js"

dotenv.config()
const loginCheck=async(req,res,next)=>{
    try{
        let token=req.headers['authorization'] || null
        if(!token){
            res.status(404).json({
                message:"Token is required"
            })
        }
        token=token.split(" ").pop()
        if(!token){
            res.status(404).json({
                message:"No such token"
            })
        }
        const data=jwt.verify(token,process.env.JWT_SECRET)
        if(data.hasOwnProperty('type'&&data.type==="refresh")){
            throw new AppError({message:"User AcESS tOKEN",code:403})
        }
        const userDetail=await AuthSvc.getSingleUserByFilter({
            _id:data.id
        })
        if (!userDetail){     
            res.status(401).json({
                message:"User doesn't exists anymore"
            })
        }
        else{

            req.authUser=userDetail;
            
            next()  
        }
    }
    catch(exception){
        console.log(exception)
        const errorObj=exception
        if(exception instanceof jwt.JsonWebTokenError){
            errorObj['message']=exception.message
            errorObj['code']=401
        }
        next(errorObj)
        
    }
}

export default loginCheck

