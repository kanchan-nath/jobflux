import { 
    signUpUserEmailAndPassword
} from "../controllers/user.controller.js";
import {Router} from "express"

const router = Router()

router.route("/signup/email-password").post(signUpUserEmailAndPassword)

export default router