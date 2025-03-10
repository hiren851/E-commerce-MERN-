const express = require("express");

const {
  addToCart,
  fetchcartItems,
  updatecartItemsQty,
  deletecartItems,
  // clearCart
} = require("../../controllers/shop/cart-controllers");



const router = express.Router();

router.post('/add' , addToCart)
router.get('/get/:userId' , fetchcartItems)
router.put('/update-cart' , updatecartItemsQty)
router.delete('/:userId/:productId' , deletecartItems)
// router.delete('/clear/:userId', clearCart);


module.exports = router;

