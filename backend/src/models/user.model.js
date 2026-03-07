import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["Job Seeker", "Employer"],
        required: true
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true})

export const User = mongoose.model("User",userSchema )