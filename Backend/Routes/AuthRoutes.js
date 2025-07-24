import express from "express";
import upload from "../utils/upload.js";
import { ForgotPasswordController, OtpForVerifyForForgotPassword, LoginController, LogoutController, ResetPasswordController, SignupController, VerifyOtpForSignup } from "../Controllers/AuthControllers.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/signup", upload.single('image'), SignupController);
AuthRoutes.post("/verify-otp", VerifyOtpForSignup);
AuthRoutes.post("/login", LoginController);
AuthRoutes.post("/logout", LogoutController);
AuthRoutes.post("/forgot-password", ForgotPasswordController);
AuthRoutes.post("/forgot-password-otp-verify", OtpForVerifyForForgotPassword);
AuthRoutes.post("/reset-password", ResetPasswordController);

export default AuthRoutes;