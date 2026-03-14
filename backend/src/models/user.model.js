import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
    },
    refreshToken:{
        type: String
    },
    enailVerified:{
        type:Boolean,
        default: false
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,        // ✅ this._id, not bare _id
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}


userSchema.methods.generateAccessToken = async ()=>{
    return jwt.sign({
        _id: _id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password:this.password,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const User = mongoose.model("User",userSchema )
