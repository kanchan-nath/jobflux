import express, {Router} from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express/json({limit: "1600kb"}))
app.use(express.urlencoded({extended:true, limit: "1600kb"}))


import userRouter from "./src/routes/user.route.js"

app.use(`/api/${process.env.VERSION}/users`, userRouter)

export {app}