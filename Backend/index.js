import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js";
import DbConnection from "./Database/Connection.js";
import ProductRoutes from "./Routes/ProductRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    return res.send("backend start successfully")
})

app.use("/api/auth", AuthRoutes);
app.use('/api/products', ProductRoutes)

DbConnection();

app.listen(PORT, ()=>{
    console.log("backend start successfully");
})

