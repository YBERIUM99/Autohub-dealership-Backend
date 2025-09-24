const dotenv = require("dotenv");
const Product = require("./models/productModel");  // Product model
const cars = require("./data.js/cars");           // your hardcoded cars file
const mongoose = require("mongoose");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Product.deleteMany({});

    // Clean cars.js before insert
    const cleanedCars = cars.map((car) => ({
      ...car,
      price: Number(car.price?.toString().replace(/[^0-9]/g, "")) || 0,  // "$20,000" -> 20000
      mileage: Number(car.mileage?.toString().replace(/[^0-9]/g, "")) || 0, // "30,000 km" -> 30000
      year: Number(car.year) || new Date().getFullYear(), // fallback to current year if missing
      engine: car.engine || "Unknown",
      transmission: car.transmission || "Unknown",
      fuel: car.fuel || "Unknown",
      image: Array.isArray(car.image) ? car.image : [car.image].filter(Boolean), // ✅ always array
      sellerName: car.sellerName || "Admin",
    }));

    await Product.insertMany(cleanedCars);

    console.log("✅ Data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
};

seedData();


