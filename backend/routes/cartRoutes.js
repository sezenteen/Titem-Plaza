const express = require("express");
const protect = require("../middleware/authMiddleware");
const Cart = require("../models/cart");
const Product = require("../models/product");

const router = express.Router();

// Get user cart
router.get("/", protect, async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart || { items: [] });
});

// Add product to cart
router.post("/", protect, async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        cart = new Cart({ user: req.user.id, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
});

// Remove item from cart
router.delete("/:productId", protect, async (req, res) => {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
});

module.exports = router;
