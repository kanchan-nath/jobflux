import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {logger} from "../loggers/logger.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const signUpUserEmailAndPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        throw new ApiError(422, "Email and Password are required");
    }

    sendEmail()

    return res
    .status(200)
    .json(new ApiResponse(200, {}))
});



export {
    signUpUserEmailAndPassword,
    
}