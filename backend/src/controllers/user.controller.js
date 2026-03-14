import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {logger} from "../loggers/logger.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { otpQueue } from "../queues/OTP.queue.js";

const genarateOTP = Math.floor(Math.random() * 1000000)

const signUpUserEmailAndPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        throw new ApiError(422, "Email and Password are required");
    }


    await otpQueue.add("sendOTP",
        {
            email: `${email}`,
            otp: `${genarateOTP}`
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {}))
});


const verifyOTP = asyncHandler(async (req, res)=>{
    const {otp} = req.body

    if(!otp){
        throw new ApiError(422, "OTP is required")
    }

    if(genarateOTP === otp){
        await User.findByIdAndUpdate(req._id, {
            enailVerified: true
        },{
            new: true
        })
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, ""))
})


export {
    signUpUserEmailAndPassword,
    verifyOTP
    
}