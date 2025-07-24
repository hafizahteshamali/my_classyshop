import allUser from "../Database/Models/AuthModel.js";
import sendEmail from "../utils/email/sendEmail.js";
import otpTemplate from "../utils/email/otpTemplate.js";
import OtpModel from "../Database/Models/OtpModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SignupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const image = req.file?.path;
        const existingUser = await allUser.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const newUser = await allUser.create({
            name,
            email,
            password,
            image,
        });
        await newUser.save();
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const expireOtp = new Date(Date.now() + 10 * 60 * 1000);
        await OtpModel.create({
            email: newUser.email,
            otp: OTP,
            expiresAt: expireOtp,
            purpose: "signup" 
        });
        await sendEmail(
            newUser.email,
            "Verify Your Email - OTP",
            otpTemplate(newUser.name, OTP)
        );
        return res.status(201).json({
            message: "Signup successful. OTP sent to email.",
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


const VerifyOtpForSignup = async (req, res) => {
    try {
        const { otp, email, purpose } = req.body;

        if (purpose !== 'signup') {
            return res.status(400).send({ message: "Invalid purpose" });
        }

        const OtpRecord = await OtpModel.findOne({ otp, email, purpose });

        if (!OtpRecord) {
            return res.status(400).send({ message: "Invalid OTP" });
        }

        if (OtpRecord.expiresAt < new Date()) {
            return res.status(400).send({ message: "OTP expired" });
        }

        await OtpModel.deleteOne({ _id: OtpRecord._id });

        const user = await allUser.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: "OTP Verified Successfully, Account Activated" });

    } catch (error) {
        console.log("OTP Verification Error:", error.message); 
        res.status(500).json({ message: "Server Error" });
    }
}

const LoginController = async (req, res)=>{
    try {
        const {email, password, role} = req.body;

        const foundUser = await allUser.findOne({ email })

        if(!foundUser){
            return res.status(400).send({message: "user not found!"});
        }

        const passwordCheck = await bcrypt.compare(password, foundUser.password)

        if(!passwordCheck){
            return res.status(400).send({message: "Invalid Credentials"});
        }

        const token = await jwt.sign({
            id: foundUser._id, 
            role: foundUser.role
        }, 
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return res.status(200).send({message: "login successfully", user: {name: foundUser.name, email: foundUser.email, role: foundUser.role, token}})

    } catch (error) {
        console.log("OTP Verification Error:", error.message); // ✅ yahan 'error' likho
        res.status(500).json({ message: "Server Error" });
    }
}

const LogoutController = async(req, res)=>{
    try {
        return res.status(200).send({message: "Logout Successfully"});
    } catch (error) {
        console.log("OTP Verification Error:", error.message); // ✅ yahan 'error' likho
        res.status(500).json({ message: "Server Error" });
    }
}

const ForgotPasswordController = async (req, res) => {
    try {
      const { email } = req.body;
      const foundUser = await allUser.findOne({ email });
      if (!foundUser) {
        return res.status(400).send({ message: "User not found" });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expireOtp = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await OtpModel.create({
        email: foundUser.email,
        otp: otp,
        expiresAt: expireOtp,
        purpose: "forgot_password"
      });
      await sendEmail(
        foundUser.email,
        "Reset Your Password - OTP",
        otpTemplate(foundUser.name, otp)
      );
      return res.status(201).json({
        message: "OTP sent to your email for password reset.",
        user: {
          name: foundUser.name,
          email: foundUser.email,
        },
      });
  
    } catch (error) {
      console.log("Forgot Password Error:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
};
  

const OtpForVerifyForForgotPassword = async (req, res) => {
    try {
        const { email, otp, purpose } = req.body;
        if (purpose !== "forgot_password") {
            return res.status(400).send({ message: "Invalid purpose" });
        }
        const OtpRecord = await OtpModel.findOne({ email, otp, purpose });
        if (!OtpRecord) {
            return res.status(400).send({ message: "Invalid OTP" });
        }
        if (OtpRecord.expiresAt < new Date()) {
            return res.status(400).send({ message: "OTP expired" });
        }
        await OtpModel.deleteOne({ _id: OtpRecord._id });
        const foundUser = await allUser.findOne({ email });
        if (!foundUser) {
            return res.status(400).send({ message: "User not found" });
        }
        foundUser.isVerified = true;
        await foundUser.save();
        return res.status(200).json({ message: "OTP Verified Successfully. Now you can reset your password." });
    } catch (error) {
        console.log("OTP Verification Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};


const ResetPasswordController = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        console.log("Resetting password for:", email);

        const userFound = await allUser.findOne({ email });

        if (!userFound) {
            return res.status(404).send({ message: "User not found" });
        }

        userFound.password = newPassword; // ✨ Don't hash here
        await userFound.save(); // ✨ Auto hashing in pre('save')

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log("Reset Password Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};


export {SignupController, VerifyOtpForSignup, LoginController, LogoutController, ForgotPasswordController, OtpForVerifyForForgotPassword, ResetPasswordController};

