
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/orderController");

router.post("/", ctrl.placeOrder);
router.get("/user", ctrl.getUserOrders);
router.get("/", ctrl.getAllOrders);
router.put("/:id/status", ctrl.updateOrderStatus);

module.exports = router;