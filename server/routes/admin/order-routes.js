const express = require("express");

const {getAllOrdersOfAllUser,getOrdersDetailsForAdmin,updateOrderStatus} = require('../../controllers/admin/order-controller');

const router = express.Router();


router.get('/get' , getAllOrdersOfAllUser);
router.get('/details/:id' , getOrdersDetailsForAdmin);
router.put('/update/:id' , updateOrderStatus);


module.exports = router;
