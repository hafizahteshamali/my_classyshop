import stripe from "../Config/Stripe.js";
import dotenv from "dotenv";
import orderModel from "../Database/models/OrderModels.js";
import cartModel from "../Database/models/CartModel.js";

dotenv.config();

export const handleStripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    // ⚡ Stripe webhook ke liye raw body chahiye
    event = stripe.webhooks.constructEvent(
      req.rawBody, // <-- rawBody yahan important hai
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed:`, err.message);
    return res.sendStatus(400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        // Update order status
        const order = await orderModel.findByIdAndUpdate(
          orderId,
          { paymentStatus: "paid", orderStatus: "processing" },
          { new: true }
        );

        // Clear user's cart
        await cartModel.findOneAndUpdate({ user: order.user }, { items: [] });

        console.log("Payment succeeded and cart cleared for order:", orderId);
        break;

      case "checkout.session.async_payment_failed":
        const failedSession = event.data.object;
        const failedOrderId = failedSession.metadata.orderId;

        await orderModel.findByIdAndUpdate(
          failedOrderId,
          { paymentStatus: "failed", orderStatus: "cancelled" },
          { new: true }
        );

        console.log("Payment failed for order:", failedOrderId);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.sendStatus(500);
  }
};