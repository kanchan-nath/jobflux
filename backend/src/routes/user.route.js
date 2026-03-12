import { 
    signUpUserEmailAndPassword,
    
} from "../controllers/user.controller.js";
import {Router} from "express"

const router = Router()

router.route("/signup/email-password").post(signUpUserEmailAndPassword)
router.route("/helloji").get((req, res)=>{
    res.send("Hello JI XXX")
})

export default router