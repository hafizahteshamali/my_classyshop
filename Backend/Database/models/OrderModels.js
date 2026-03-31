import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: Number,
            price: Number
        }
    ],
    shippingAddress: {
        fullname: String,
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "STRIPE"],
        default: "COD"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    },
    totalAmount: Number
}, {timestamps: true})

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;