import stripe from "../Config/Stripe.js";
import dotenv from "dotenv";
import orderModel from "../Database/models/OrderModels.js";

dotenv.config();
export const handleStripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      // Order ID metadata se lena
      const orderId = session.metadata.orderId;

      // Payment status update
      await orderModel.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
        orderStatus: "processing",
      });
      console.log("Payment succeeded for order:", orderId);

      break;
    case "checkout.session.async_payment_failed":
      const failedSession = event.data.object;
      const failedOrderId = failedSession.metadata.orderId;
      await orderModel.findByIdAndUpdate(failedOrderId, {paymentStatus: "failed", orderStatus: "cancelled"})
      console.log("Payment failed for order:", failedOrderId);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
