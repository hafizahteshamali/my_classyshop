import multer from "multer";
import profileStorage from "../Config/ProfileCloudinary.js";

const uploadProfile = multer({storage: profileStorage})

export default uploadProfile;