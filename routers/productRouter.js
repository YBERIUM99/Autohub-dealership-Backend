const express = require("express");
const Product = require("../models/productModel");
const User = require("../models/userModel"); // make sure you have this
const auth = require("../middlewares/auth"); // your JWT auth middleware

const router = express.Router();

// GET - All products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Car not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid product ID" });
  }
});

// POST - Add product (only for logged-in users)
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      year,
      transmission,
      fuel,
      mileage,
      color,
      engine,
      image,
      sellerPhone,
      sellerEmail,
      sellerLocation,
    } = req.body;

    // Fetch seller info from user collection
    const seller = await User.findById(req.user.id);
    if (!seller) return res.status(404).json({ error: "User not found" });

    const product = new Product({
      name,
      description,
      price,
      year,
      transmission,
      fuel,
      mileage,
      color,
      engine,
      image,
      sellerName: seller.firstName ? `${seller.firstName} ${seller.lastName}` : seller.email,
      sellerPhone: sellerPhone || "",
      sellerEmail: sellerEmail || "",
      sellerLocation: sellerLocation || "",
      sellerImage: seller.profileImage || "", // <-- save Cloudinary URL from user
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;




