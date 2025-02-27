const express = require("express");

const {
  addToCart,
  fetchCartItems,
  updateCartItemsQty,
  deleteCartItems,
} = require("../../controllers/shop/cart-controllers");



const router = express.Router();

router.post('/add' , addToCart)
router.get('/get/:userId' , fetchCartItems)
router.put('/update-cart' , updateCartItemsQty)
router.delete('/:userId/:productId' , deleteCartItems)

module.exports = router;

