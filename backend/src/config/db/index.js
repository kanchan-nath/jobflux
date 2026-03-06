import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        
        console.log(`MongoDB connected successfully:\nDB Name: ${connectionInstance.connection.name}\nDB Host: ${connectionInstance.connection.host}\n`)
        
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`)
    }
    
}

connectDB()

export {connectDB}