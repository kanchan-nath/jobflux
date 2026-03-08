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

userSchema.methods.generateRefreshToken = async()=>{
    return jwt.sign(
        {
            _id:_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema )
