const express = require("express");
const Car = require("../models/carModel");
const auth = require("../middlewares/auth");

const router = express.Router();

// ✅ GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});






// GET single car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET cars by seller name (first + last)
router.get("/user", auth, async (req, res) => {
  try {
    const sellerName = `${req.user.firstName} ${req.user.lastName}`;
    const cars = await Car.find({ sellerName });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add router exports
module.exports = router;