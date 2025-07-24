import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: 'don2bgsbp',
    api_key: '123431144484992',
    api_secret: '9_dXypvOAwejxLom4LsEVe774zQ'
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "user_profiles",
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{width: 500, height: 500, crop: 'limit'}]
    }
})

export default storage;