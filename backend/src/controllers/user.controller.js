import mongoose from "mongoose";
import { User } from "../models/user.model";
import { asyncHandler, ApiError, ApiResponse } from "../utils/asyncHandler.js"
import {logger} from "../loggers/logger.js"

const signUpUser = asyncHandler(async (req,res)=>{
    const {firstName, lastName, password, phoneNumber,role,} = req.body

    if(!firstName || !lastName || !password || !phoneNumber || !role){
        throw new ApiError(422, "All fields are required")
    }

    const user = await User.create({
        fullName: fullName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        phoneNumber,
        password,
        role

    })

    return res
    .status(200)
    .ApiResponse(200, user, "Sign up successfull")


})

export {
    signUpUser,
}