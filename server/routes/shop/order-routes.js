const express = require("express");

const {createOrder, capturePayment , getAllOrderByUser ,getOrdersDetails} = require('../../controllers/shop/order-controller');

const router = express.Router();

router.post('/payment-checkout' , createOrder);
router.post('/capture' , capturePayment);
router.get('/list/:userId' , getAllOrderByUser);
router.get('/details/:id' , getOrdersDetails);


module.exports = router;
