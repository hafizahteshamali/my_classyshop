import express from "express";
import uploadProfile from "../middlewares/uploadProfile.js";
import { ForgotPassControllers, LoginControllers, LogoutControllers, resendOtp, ResetPassControllers, SignupControllers, VerifyForgotPassControllers, VerifySignupControllers } from "../Controllers/AuthControllers.js";

const authRoute = express.Router();

authRoute.post("/signup", uploadProfile.single("profile"), SignupControllers)
authRoute.post("/verify-otp-signup", VerifySignupControllers)
authRoute.post("/resend-otp", resendOtp)
authRoute.post("/login", LoginControllers)
authRoute.post("/logout", LogoutControllers)
authRoute.post("/forgot-password", ForgotPassControllers)
authRoute.post("/verify-forgot-password", VerifyForgotPassControllers)
authRoute.post("/reset-password", ResetPassControllers)

export default authRoute;