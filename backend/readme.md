Creating a server using http with port 3000 and with the help of express which is used as framework

A router is setup using express.Router() 

MongoDB is used for database

Express.json is used as a middleware for incoming request with JSON payloads which allows express to parse json bodies and expose the resulting object as req.body. Also express.urlencoded is used as a middleware for incoming request with URL-incoding payloads such as payloads sent by HTML forms and exposes the resulting object on as 'req.body'

In registration, login joi is used as validator so that wrong data doesn't password

Also bcrypt and bcrypt.compareSync is used in register and login so that password is secured and when needed we can compare so that user can login

Jsonwebtoken as jwt is attached when user is loggedIn so that it can be used for data exchange in frontend and also provide a way to verify the authneticity of the sender

To reset the user password user need to put their email id if it's in the database a email is sent using nodemailer and gmail as host so when they set their new password they will also need to verify their otp that is sent to them in their email respectively

Middlewares are used for validation and loginCheck of user incase we need to check if the user's data is valida or not also, is logged in or not
