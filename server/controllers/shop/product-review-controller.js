const Order = require("../../models/Order");
const ProductsReview = require("../../models/Review");
const Products = require("../../models/Products");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      res.status(403).json({
        success: false,
        message: "You need to purchase the product to review it",
      });
    }

    const checkExistingReview = await ProductsReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "Already reviewed this product",
      });
    }

    const newReview = new ProductsReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductsReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Products.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductsReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
