const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true } // ✅ new field for images
});

module.exports = mongoose.model("Car", carSchema);
