const express = require("express");

const {createOrder} = require('../../controllers/shop/order-controller');

const router = express.Router();

router.post('/payment-checkout' , createOrder);

module.exports = router;
