import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["signup", "forgot_password"],
      required: true
    },
    isVerified: { 
      type: Boolean, 
      default: false
    }
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;
