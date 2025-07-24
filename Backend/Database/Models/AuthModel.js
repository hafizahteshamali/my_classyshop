import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Optional default image
    },
    role: {
      type: String,
      enum: ["user", "admin"], // optional, agar sirf allowed roles specify karne ho
      default: "user"
    }
  },
  { timestamps: true }
);


AuthSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const allUser = mongoose.model("users", AuthSchema);

export default allUser;