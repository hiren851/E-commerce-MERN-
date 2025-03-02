const Order = require("../../models/Order");
const Stripe = require("stripe")(
  "sk_test_51QxPWqA8ZItKkZV0Gb0GVJNN2RhnVTSbrnPQCp5X4PF7M7Ui4oy3Hth9LMvfUNiuUaifhkFpCBeqY31eRQFknJzz00SpyiT0wR"
);

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    if (!cartItems) {
      return res.status(400).json({
        success: false,
        message: "Invalid data!",
      });
    }
    {console.log(cartItems)}

    const lineItems = cartItems.map((cartItem) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: cartItem.title,
        },
        unit_amount: cartItem.price * 100,
      },
      quantity: cartItem.quantity,
    }));
    

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/shop/success",
      cancel_url: "http://localhost:5173/shop/cancel",
      customer_email: req.body.userEmail, 
      metadata: { userId: userId },
    });

    res.json({
      id: session.id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

module.exports = { createOrder };
