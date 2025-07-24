import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    oldPrice: {
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    featureImages: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
