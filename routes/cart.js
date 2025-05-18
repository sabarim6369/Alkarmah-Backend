
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cartController");

router.post("/add", ctrl.addToCart);
router.post("/remove", ctrl.removeFromCart);
router.get("/", ctrl.getCart);

module.exports = router;