import { 
    signUpUser
} from "../controllers/user.controller";
import {Router} from "express"

const router = Router()

router.route("/signup").post( signUpUser)

export default router