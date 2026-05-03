import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnection from "./Database/DbConnection.js";
import authRoute from "./Routes/AuthRoutes.js";
import categoryRoute from "./Routes/CategoryRoutes.js";
import productRoute from "./Routes/ProductRoutes.js";
import cartRoutes from "./Routes/CartRoutes.js";
import orderRoute from "./Routes/OrderRoutes.js";
import cookieParser from "cookie-parser";
import webhookRoute from "./Routes/WebhookRoutes.js";

dotenv.config();

const app = express();

// ✅ Raw body saver middleware - ye raw body capture karega
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use("/api/webhook", express.raw({ type: "application/json" }), webhookRoute);

app.use(cookieParser());

app.use(express.json({ verify: rawBodySaver }));

app.use(cors({
    origin: "https://my-classyshop-xy8i.vercel.app",
    credentials: true
}))

app.use("/api/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoute);

const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    return res.status(200).send({success: true, message: "Welcome to Ecommerce Backend"})
})

DBConnection();

export default app;