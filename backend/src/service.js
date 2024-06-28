import { UserModel } from "./database.js"
import EmailSvc from "./mailing/mail.service.js"


class AuthServices {

    userStore = async (data) => {
        try {
            const user = new UserModel(data)
            return await user.save()
        }
        catch (exception) {
            throw exception
        }
    }

    sendForgetPassEmail = async ({email, otp}) => {
        try {
            console.log("email",email)
            const response=await EmailSvc.sendEmail({
                to: email,
                subject: "Reset Your Password",
                html: `
                Dear <b> ${email}</b>,</br>
                <p>You have requested for a password change.</p><br>
                <p>Please click the otp below to reset your password</p>
                 ${otp}
                <p>Your link is activated only for 2 hours</p>
                <b> Regards</b>
                `,
                text: `
                Dear ${email}\n
                You have requested to password change
                if this is your request, please copy and paste the otp given below, or ignore this mesage
                Regards\n
                `
            })
            return response
        }
        catch (exception) {
            throw exception
        }
    }

    checkEmail = async (email) => {
        try {
            const response = await UserModel.findOne({ email: email })
            return response
        }
        catch (exception) {
            throw exception
        }
    }

    getSingleUserByFilter = async (filter) => {
        try {
            const user = await UserModel.findOne(filter)
            return user
        }
        catch (exception) {
            throw exception
        }
    }

    updateUser = async (id, data) => {
        try {
            const response = await UserModel.findByIdAndUpdate(id, {
                $set: data
            },{new:true})
            if (!response) {
                throw new Error('User not found')
            }
            return response
        }
        catch (exception) {
            throw exception
        }
    }

    deleteUser=async(id)=>{
        try{
            const response=await UserModel.findByIdAndDelete(id)
            return response
        }
        catch(exception){
            throw exception
        }
    }

}
const AuthSvc = new AuthServices()
export default AuthSvc