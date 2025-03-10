const Order = require("../../models/Order");
const { clearCart } = require("./cart-controllers"); // Import clearCart function

const Cart = require("../../models/Cart");
const Product = require("../../models/Products");
const Stripe = require("stripe")(
  "sk_test_51QxPWqA8ZItKkZV0Gb0GVJNN2RhnVTSbrnPQCp5X4PF7M7Ui4oy3Hth9LMvfUNiuUaifhkFpCBeqY31eRQFknJzz00SpyiT0wR"
);

const createOrder = async (req, res) => {
  try {
    // console.log("Received cartId:", cartId); // Log the cartId for debugging
    const {
      userId,
      orderId,
      cartId,
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
    {
      console.log(cartItems);
    }

    const lineItems = cartItems.map((cartItems) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: cartItems.title,
        },
        unit_amount: cartItems.price * 100,
      },
      quantity: cartItems.quantity,
    }));

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_BASE_URL}/shop/success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/shop/cancel`,
      customer_email: req.body.userEmail,
      metadata: { userId: userId, orderId: orderId },
    });

    if (!session) {
      return res.json({
        success: false,
        message: "Failed to create session",
      });
    } else {
      const newOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        totalAmount,
        orderStatus,
        paymentMethod,
        paymentStatus,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
      });

      await newOrder.save();
      res.status(201).json({
        success: true,
        message: "Order Created successfully",
        data: newOrder,
        id: session?.id,
        orderId: newOrder?._id,
        url: session?.url,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // ✅ Update Payment & Order Status
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    // ✅ Ensure cartId is defined
    const cartId = order.cartId;
    
    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "Cart ID is missing, cannot delete cart",
      });
    }

    // ✅ Delete Cart
    await Cart.findByIdAndDelete(cartId);

    // ✅ Save updated order
    await order.save();



    for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);
  
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Not enough stock fot this product ${product.title}`,
          });
        }
  
        product.totalStock -= item.quantity;
  
        await product.save();
      }

      
    return res.status(200).json({
      success: true,
      message: "Order confirmed & cart deleted",
      data: order,
    });

  } catch (error) {
    console.error("Capture Payment Error:", error.message); // Log the error message for debugging

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "An unexpected error occurred",
    });
  }
};


const getAllOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Orders not Found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not Found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrderByUser,
  getOrdersDetails,
};
