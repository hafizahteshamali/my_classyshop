import stripe from "../Config/Stripe.js";
import dotenv from "dotenv";
import orderModel from "../Database/models/OrderModels.js";
import cartModel from "../Database/models/CartModel.js";

dotenv.config();

export const handleStripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  
  // ✅ Get raw body - in Vercel, it might be in req.body or req.rawBody
  let rawBody;
  
  if (req.rawBody) {
    rawBody = req.rawBody;
  } else if (req.body) {
    // If req.body is already a Buffer
    rawBody = req.body;
  } else {
    console.log("No body received");
    return res.status(400).send("No webhook payload was provided");
  }

  let event;

  try {
    // Convert to string if it's a Buffer
    const payload = Buffer.isBuffer(rawBody) ? rawBody.toString() : rawBody;
    
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
          console.log("No orderId in metadata");
          break;
        }

        console.log("Processing order:", orderId);

        // Update order status
        const order = await orderModel.findByIdAndUpdate(
          orderId,
          { paymentStatus: "paid", orderStatus: "processing" },
          { new: true }
        );

        if (order) {
          // Clear user's cart
          await cartModel.findOneAndUpdate(
            { user: order.user }, 
            { items: [] }
          );
          console.log("Payment succeeded and cart cleared for order:", orderId);
        } else {
          console.log("Order not found:", orderId);
        }
        break;

      case "checkout.session.async_payment_failed":
        const failedSession = event.data.object;
        const failedOrderId = failedSession.metadata?.orderId;

        if (failedOrderId) {
          await orderModel.findByIdAndUpdate(
            failedOrderId,
            { paymentStatus: "failed", orderStatus: "cancelled" },
            { new: true }
          );
          console.log("Payment failed for order:", failedOrderId);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).send("Webhook handler failed");
  }
};