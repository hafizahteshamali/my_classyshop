import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import CheckoutSessionController from "../Controllers/PaymentControllers.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-checkout-session", requireAuth, CheckoutSessionController);

export default paymentRoute;