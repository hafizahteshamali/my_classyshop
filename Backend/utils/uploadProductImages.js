import productStorage from "../config/CloudinaryProduct.js";
import multer from "multer";


const uploadProduct = multer({ storage: productStorage });

export default uploadProduct;
