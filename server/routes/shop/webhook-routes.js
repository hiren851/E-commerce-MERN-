const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51QxPWqA8ZItKkZV0Gb0GVJNN2RhnVTSbrnPQCp5X4PF7M7Ui4oy3Hth9LMvfUNiuUaifhkFpCBeqY31eRQFknJzz00SpyiT0wR");
const Order = require("../../models/Order"); // Import Order model
const endpointSecret = "whsec_ee3a2844a7e0b439172d80797b16e93d251a099716a05fc093d40fed0ad109cb";

router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // const orderId = session.metadata?.orderId; 

      // Extract Payment & Payer Info
      const payerId = session.customer || "Guest"; // Stripe Customer ID
      const payerEmail = session.customer_email || "No email provided";
      const paymentIntentId = session.payment_intent || "No payment intent";
      const amount = session.amount_total / 100; // Convert cents to dollars
      const currency = session.currency;
      const status = "completed"; // Mark as completed after successful payment
      const orderId = session.metadata?.orderId; // Get orderId from metadata

      console.log("Payment Successful!");
      console.log("Order ID:", orderId);
      console.log("Payer ID:", payerId);
      console.log("Payment Intent ID:", paymentIntentId);

      if (!orderId) {
        console.error("Order ID missing in session metadata!");
        return res.status(400).json({ error: "Order ID not found in metadata." });
      }

      // Update the corresponding order in the database
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            payerId,
            paymentIntentId,
            paymentStatus: "completed",
            orderStatus: "confirmed",
          },
        },
        { new: true }
      );

      if (!updatedOrder) {
        console.error("Order not found in database!");
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Order updated successfully:", updatedOrder);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
