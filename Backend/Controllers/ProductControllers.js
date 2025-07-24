import ProductModel from "../Database/Models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

const CreateProductController = async (req, res) => {
  try {
    const {
      productName,
      description,
      brand,
      stock,
      category,
      size,
      oldPrice,
      salePrice,
      discount,
      ratings,
      quantity,
      btnText,
    } = req.body;

    const sizeArray = typeof size === 'string' ? size.split(",") : size;

    const files = req.files;

    if (!files || !files.images || !files.featureImages) {
      return res.status(400).json({
        status: 400,
        message: "Images and Feature Images are required",
      });
    }

    const images = files.images.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const featureImages = files.featureImages.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const response = await ProductModel.create({
      productName,
      description,
      brand,
      stock,
      category,
      size: sizeArray,
      oldPrice,
      salePrice,
      discount,
      ratings,
      quantity,
      btnText,
      images,
      featureImages,
    });

    return res
      .status(200)
      .json({ status: 200, message: "Product added successfully", response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const GetAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({
      status: 200,
      message: "Get all products successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Get single product", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const DeleteProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res
        .status(400)
        .send({ status: 400, message: "Product not found" });
    }

    await cloudinary.uploader.destroy(product.image.public_id);

    const response = await ProductModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const UpdateProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, brand, stock, category, size, oldPrice, salePrice, discount, ratings, quantity, btnText, images, featureImages } = req.body;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    let updatedImage = product.image;
    let updatedImagePublicId = product.image.public_id;

    if (req.file) {
      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      updatedImage = req.file.path;
      updatedImagePublicId = req.file.filename;
    }

    const response = await ProductModel.findByIdAndUpdate(
      id,
      {
        productName,
        description,
        brand,
        stock,
        category,
        size,
        oldPrice,
        salePrice,
        discount,
        ratings,
        quantity,
        btnText,
        images,
        featureImages,
        image: {
          url: updatedImage,
          public_id: updatedImagePublicId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      response,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};


export {
  CreateProductController,
  GetAllProductsController,
  GetProductByIdController,
  DeleteProductByIdController,
  UpdateProductByIdController,
};
