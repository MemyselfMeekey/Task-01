import express from "express"
import AuthCtrl from "./router.controller.js"
import {  validateLogin, validateRegistration, setNewPass } from "./middlewares/auth.middleware.js"
import loginCheck from "./middlewares/loginCheck.js"


const router=express.Router()

router.post('/register',validateRegistration,AuthCtrl.register)
router.post('/login',validateLogin,AuthCtrl.login)
router.get('/all-users',AuthCtrl.getAllData)
router.post("/reset-pass",AuthCtrl.resetPass)
router.post("/set-pass",setNewPass,AuthCtrl.setNewPass)


router.put('/update/:id',loginCheck,AuthCtrl.updateUser)
router.delete('/:id',loginCheck,AuthCtrl.deleteUser)

export default router