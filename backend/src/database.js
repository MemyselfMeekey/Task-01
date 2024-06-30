import mongoose from "mongoose";

const UserDataSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    phone:Number,
    password:String,
    expiryDate:Date,
    forgetOtp:String,
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const UserModel=mongoose.model("Task01",UserDataSchema)

export {
    UserModel
}