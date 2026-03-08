import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    phoneNumber:{
        type: String,
        // required: true
    },
    role:{
        type: String,
        enum:["Job Seeker", "Employer"],
        // required: true
    },
    password:{
        type: String,
        // required: true,
    },
    email:{
        type:String,
        required: true
    }
}, {timestamps: true})


userSchema.pre("save", async (next)=>{
    if(!this.isModified(password)){
        return next();

    }
    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.isPasswordCorrect = async (password)=>{
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User",userSchema )
