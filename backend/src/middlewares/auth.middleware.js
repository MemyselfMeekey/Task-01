import joi from "joi"

const Register=joi.object({
    email:joi.string().email().required(),
    name:joi.string().min(2).max(16).required(),
    phone:joi.string().pattern(/^[0-9]{10}$/).required(),
    password:joi.string().min(8).max(16).required(),
   
})

export const validateRegistration=(req,res,next)=>{
    const {error}=Register.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    next()
}

const login=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(16).required()
})


export const validateLogin=(req,res,next)=>{
    const {error}=login.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    next()
}

const setnewPass=joi.object({
   email:joi.string().email().required(),
   otp:joi.number().required(),
   password:joi.string().min(8).max(12).required(),
    confirmPassword:joi.string().valid(joi.ref('password')).messages({'any.only':"confirm passwrod must match with password"})
})

export const setNewPass=(req,res,next)=>{
    const {error}=setnewPass.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    next()
}

