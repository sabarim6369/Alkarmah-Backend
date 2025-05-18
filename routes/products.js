
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productController");

router.post("/", ctrl.createProduct);
router.put("/:id", ctrl.updateProduct);
router.delete("/:id", ctrl.deleteProduct);
router.get("/", ctrl.getAllProducts);
router.get("/:id", ctrl.getProductById);

module.exports = router;
