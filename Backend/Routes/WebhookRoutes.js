import express from "express";
import { handleStripeWebhook } from "../Controllers/WebhookControllers.js";

const webhookRoute = express.Router();

webhookRoute.post("/", handleStripeWebhook);

export default webhookRoute;