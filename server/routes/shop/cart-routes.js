const express = require("express");

const {
  addToCart,
  fetchcartItems,
  updatecartItemsQty,
  deletecartItems,
} = require("../../controllers/shop/cart-controllers");



const router = express.Router();

router.post('/add' , addToCart)
router.get('/get/:userId' , fetchcartItems)
router.put('/update-cart' , updatecartItemsQty)
router.delete('/:userId/:productId' , deletecartItems)

module.exports = router;

