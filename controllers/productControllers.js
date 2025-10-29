
const Product = require("../models/productModel");

exports.getCarsBySellerName = async (req, res) => {
  try {
    const user = req.user; // comes from auth middleware
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    //  Find by sellerId
    const cars = await Product.find({ sellerId: user.id });

    res.json(cars);
  } catch (err) {
    console.error("Error fetching seller cars:", err);
    res.status(500).json({ message: "Server error" });
  }
};


