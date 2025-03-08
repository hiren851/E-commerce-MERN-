const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopWebHookRouter = require("./routes/shop/webhook-routes");
const shopSearchRouter = require("./routes/shop/search-routes"); 
const shopReviewRouter = require("./routes/shop/review-routes"); 
const commonFeatureRouter = require("./routes/common/feature-routes"); 

mongoose
  .connect(
    "mongodb+srv://hirenkanzariya851:Hiren7456@e-commerce-cluster.43guc.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use("/api/shop/webhook", bodyParser.raw({ type: "application/json" }));

app.use(express.json()); // Apply JSON parsing for all other routes

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/webhook", shopWebHookRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);


app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
