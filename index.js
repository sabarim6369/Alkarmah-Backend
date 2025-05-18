const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const app = express();
const connectDb=require("./Config/Connection")
app.use(cors());
app.use(express.json());
connectDb()

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
