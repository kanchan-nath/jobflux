import mongoose from "mongoose"
import { logger } from "../../loggers/logger.js"

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        
        logger.info(`MongoDB connected successfully:\nDB Name: ${connectionInstance.connection.name}`)
        
    } catch (error) {
        logger.info(`MongoDB connection failed: ${error}`)
    }
    
}


export {connectDB}