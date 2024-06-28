import dotenv from "dotenv"
import AuthSvc from "./service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "./database.js"
import Randomstring from "randomstring"
dotenv.config()

class AuthController {

    register = async (req, res, next) => {
        try {

            const payload = req.body

            const hashpassword = await bcrypt.hash(payload.password, 10)

            payload.password = hashpassword

            const emailCheck = await AuthSvc.checkEmail(payload.email)

            if (emailCheck) {
                return res.status(409).json({
                    result: {},
                    message: "Email has already been registered",
                    meta: null
                })
            }

            const user = await AuthSvc.userStore(payload)

            res.json({
                result: user.email,
                message: "User has been successfully registered",
                meta: null
            })

        }
        catch (exception) {
            console.log(exception)
            res.status(500).json({
                result: {},
                message: exception.message || "An error occurred",
                meta: null
            });
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await AuthSvc.getSingleUserByFilter({
                email: email
            })
            if (!user) {
                res.status(404).json({
                    result: {},
                    message: "User Not Found",
                    meta: null
                })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(404).json({
                    resulT: {},
                    message: "Password Doesn't Match",
                    meta: null
                })
            }

            const accessToken = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET, {
                expiresIn: "4h"
            })
            const refreshToken = jwt.sign({
                id: user._id,
                type: "refresh"
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })

            res.json({
                result: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userDetail: user.email
                },
                message: "Login Successfull",
                meta: null
            })

        }
        catch (exception) {
            console.log(exception)
        }
    }

    getAllData = async (req, res, next) => {
        try {
            const response = await UserModel.find().select('-password')
            res.status(200).json({
                result: response,
                message: "All users feteched",
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
        }
    }

    resetPass = async (req, res, next) => {
        try {
            const { email } = req.body
            // JSON.stringify(email)
            const userDetail = await AuthSvc.getSingleUserByFilter({
                email: email
            })
            if (!userDetail) {
                res.status(404).json({
                    message: "User has not been registered"
                })
            }
            const otp = Randomstring.generate({
                length: 4,
                charset: 'numeric'
            })
            const expirtyDate = new Date(Date.now() + (2 * 60 * 60 * 1000))
            const updatedUser = {
                forgetOtp: otp,
                expirtyDate: expirtyDate
            }
            const update = await AuthSvc.updateUser(userDetail._id, updatedUser)
            console.log("userDetail", userDetail.email)
            if (update) {
                await AuthSvc.sendForgetPassEmail({ email: userDetail.email, otp: otp })
                res.json({
                    result: updatedUser,
                    message: "Please check your email!",
                    meta: null
                })
            }
            else {
                throw new Error({ message: "Your request cannot be processed at this moment", code: 400 })
            }
        }
        catch (exception) {
            console.log(exception)
        }
    }

    setNewPass = async (req, res, next) => {
        try {
            const { email, otp, confirmPassword } = req.body
            const userDetail = await AuthSvc.getSingleUserByFilter({
                email: email
            })
            if (!userDetail) {
                 res.status(404).json({ message: "Email doesn't exists" })
            }
            if (otp !== userDetail.forgetOtp) {
                res.status(409).json({ message: "Otp doesn't match" })
            }

            const hashedPassword = await bcrypt.hash(confirmPassword, 10);
           const updatedUser=await AuthSvc.updateUser(userDetail._id,{password:hashedPassword})

            res.status(200).json({ 
                result:updatedUser.email,
                message: "Password has been updated successfully",
                meta:null
            });


        }
        catch (exception) {
            console.log(exception)
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const id=req.params.id
            const updateData=req.body
            const updateUser=await AuthSvc.updateUser(id,updateData)
            if (!updateUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', result: updateUser.email });
        }
        catch (exception) {
            console.log(exception)
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const id= req.params.id;
            const deletedUser = await AuthSvc.deleteUser(id)
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (exception) {
            console.log(exception)
        }
    }


}
const AuthCtrl = new AuthController()
export default AuthCtrl