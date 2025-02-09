const express = require("express");
const Order = require("../models/order");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
    const { items, totalPrice } = req.body;
    const order = new Order({ user: req.user.id, items, totalPrice });
    await order.save();
    res.status(201).json(order);
});

module.exports = router;
