const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a new product
router.post("/", async (req, res) => {
    const { name, price, description, image, category, stock } = req.body;
    const product = new Product({ name, price, description, image, category, stock });
    await product.save();
    res.status(201).json(product);
});

module.exports = router;
