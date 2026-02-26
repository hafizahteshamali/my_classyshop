import express from "express";
import { CreateProductController, DeleteProductController, GetAllProductsController, GetSingleProductController, UpdateProductController } from "../Controllers/ProductControllers.js";

const productRoute = express.Router();

productRoute.post("/add", CreateProductController);
productRoute.get("/", GetAllProductsController);
productRoute.get("/:id", GetSingleProductController);
productRoute.delete("/:id", DeleteProductController);
productRoute.put("/:id", UpdateProductController);

export default productRoute;