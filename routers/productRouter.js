const express = require("express");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const auth = require("../middlewares/auth");
const { getCarsBySellerName } = require("../controllers/productControllers");

const router = express.Router();

// Fetch cars owned by logged-in seller
router.get("/my-cars", auth, getCarsBySellerName);

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

// POST - Add product
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

    // Fetch seller info
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
      sellerId: seller._id,
      sellerName: seller.firstName ? `${seller.firstName} ${seller.lastName}` : seller.email,
      sellerPhone: sellerPhone || "",
      sellerEmail: sellerEmail || "",
      sellerLocation: sellerLocation || "",
      sellerImage: seller.profileImage || "",
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE - Remove a car
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Car not found" });

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this car" });
    }

    await product.deleteOne();
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;





