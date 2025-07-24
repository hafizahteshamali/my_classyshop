import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: 'don2bgsbp',
    api_key: '123431144484992',
    api_secret: '9_dXypvOAwejxLom4LsEVe774zQ'
})

const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Products_images",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 800, height: 800, crop: "limit" }]
    }
})

export default productStorage;

