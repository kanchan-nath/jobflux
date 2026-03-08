import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {logger} from "../loggers/logger.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// const signUpUser = asyncHandler(async (req,res)=>{
//     const {firstName, lastName, password, phoneNumber,role,} = req.body

//     if(!firstName || !lastName || !password || !phoneNumber || !role){
//         throw new ApiError(422, "All fields are required")
//     }

//     const user = await User.create({
//         fullName: fullName.toLowerCase(),
//         lastName: lastName.toLowerCase(),
//         phoneNumber,
//         password,
//         role

//     })

//     return res
//     .status(200)
//     .ApiResponse(200, user, "Sign up successfull")


// })

const signUpUserEmailAndPassword = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    logger.info(req.body)
    if(!email || !password){
        throw new ApiError(422, "Email and Password are required")
    }

    const emailPasswordResponse = await User.create({
        email,
        password
    })

    logger.info(emailPasswordResponse)
    return res
    .status(200)
        .json(new ApiResponse(200, emailPasswordResponse))
})

export {
    signUpUserEmailAndPassword,
}