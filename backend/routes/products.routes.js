const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product
router.post('/products', async (req, res) => {
  const { name, price, image, description } = req.body;
  const newProduct = new Product({ name, price, image, description });
  await newProduct.save();
  res.json(newProduct);
});

module.exports = router;
