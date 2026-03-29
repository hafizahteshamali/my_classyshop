import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authModel from "../Database/models/AuthModels.js";

dotenv.config();

export const requireAuth = async (req, res, next)=>{
    try {
        let token;
        if(req.cookies.token){
            token = req.cookies.token;
        }
        if(!token){
            return res.status(401).send({success: false, message: "no token provided"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await authModel.findById(decoded._id).select("-password");
        if(!user){
            return res.status(404).send({success: false, message: "user not found!"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({success: false, message: "Invalid or expired token"});
    }
}

export const isAdmin = async (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        return res.status(403).send({success: false, message: "Access denied. Admin only."});
    }
}