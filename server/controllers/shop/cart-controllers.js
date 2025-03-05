const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const addToCart = async (req, res) => {
  // console.log("User ID:", req.body.userId); // Log the userId for debugging

  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data!",
      });
    }

    const product = await Product.findById(productId);
   

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found!",
      });
    }

    let cart = await Cart.findOne({ userId }); // Find cart by userId

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (findCurrentProductIndex == -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const fetchcartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Valid User ID is required!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path : 'items.productId',
      select : 'image title price salePrice'
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not Found!",
      });
    }
const validItems = cart.items.filter(productItem => productItem.productId);

if(validItems.length < cart.items.length ){
  cart.items = validItems
  await cart.save();
}

const populatecartItems = validItems.map(item  => ({
  productId :  item.productId._id,
  image : item.productId.image,
  title : item.productId.title,
  price : item.productId.price,
  salePrice : item.productId.salePrice,
  quantity : item.quantity,
}))

res.status(200).json({
  success : true , 
  data : {
    ...cart._doc,
    items: populatecartItems
  }
})



   
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

const updatecartItemsQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("User ID:", userId); // Log the userId for debugging

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data!",
      });
    }

    let cart = await Cart.findOne({ userId }); // Find cart by userId

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found!",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "cart items is not present!",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populatecartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatecartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const deletecartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    console.log("User ID:", userId); // Log the userId for debugging

    if (!userId || !productId) {
      console.log("Invalid data for deletion:", { userId, productId }); // Log invalid data

      return res.json({
        success: false,
        message: "Invalid Data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item .productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populatecartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatecartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addToCart,
  updatecartItemsQty,
  deletecartItems,
  fetchcartItems,
};
