import express from "express"
import { app } from "./app.js"
import dotenv from "dotenv"
import {connectDB} from "./src/configs/db/index.js"
import {logger} from "./src/loggers/logger.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port ${process.env.PORT }`)
    })
})
.catch((error)=>{
    logger.error(`MongoDB connection failed, ${error}`);
    
})
