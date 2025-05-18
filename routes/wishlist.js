
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlistController");

router.post("/add", ctrl.addToWishlist);
router.post("/remove", ctrl.removeFromWishlist);
router.get("/", ctrl.getWishlist);

module.exports = router;
