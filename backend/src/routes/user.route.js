import { 
    signUpUserEmailAndPassword,
    verifyOTP
    
} from "../controllers/user.controller.js";
import {Router} from "express"

const router = Router()

router.route("/signup/email-password").post(signUpUserEmailAndPassword)

router.route("/auth/verify-otp").post(verifyOTP)



export default router