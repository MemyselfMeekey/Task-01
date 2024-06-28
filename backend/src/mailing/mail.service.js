import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config()

class EmailService{
    #transporter
    constructor() {
    try{
        this.#transporter=nodemailer.createTransport({
            service:'gmail',
            host:process.env.SMTP_HOST,
            port:587,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS
            }
        })
    
    }
    
    catch(exception){
        console.log("mail connection error",exception)
        throw exception
    }
}
sendEmail=async({to,subject,html=null,text})=>{
          
    try{
        console.log("to",to)
        console.log("subject",subject)
      const mailOptions={//to send the email
            to:to,
            subject:subject,
            from:'usermanager123@gmail.com',
            html:html || text,
            text:text || html
            
      }
      const status=await this.#transporter.sendMail(mailOptions)
        return status
    }
    catch(exception){
        console.log("Exception", exception)
        throw exception

    }
}
}
const EmailSvc=new EmailService()
export default EmailSvc