const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if product already in cart - if yes, update quantity
    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingItemIndex >= 0) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalLength = user.cart.length;
    user.cart = user.cart.filter((item) => item.product.toString() !== productId);

    if (user.cart.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await user.save();
    return res.status(200).json({ message: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Missing userId in query" });

    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(user.cart);
    return res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
