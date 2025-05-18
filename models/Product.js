const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { en: String, ar: String },
  description: { en: String, ar: String },
  price: Number,
  image: [String],
  stock: Number,
  category: String,
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Product", ProductSchema);
