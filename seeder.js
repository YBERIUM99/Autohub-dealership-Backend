const dotenv = require("dotenv");
const Product = require("./models/productModel");  
const cars = require("./data.js/cars");           
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
      price: Number(car.price?.toString().replace(/[^0-9]/g, "")) || 0,  
      mileage: Number(car.mileage?.toString().replace(/[^0-9]/g, "")) || 0, 
      year: Number(car.year) || new Date().getFullYear(), 
      engine: car.engine || "Unknown",
      transmission: car.transmission || "Unknown",
      fuel: car.fuel || "Unknown",
      image: Array.isArray(car.image) ? car.image : [car.image].filter(Boolean), 
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


