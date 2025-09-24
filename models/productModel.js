const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // instead of title
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuel: { type: String, required: true },
    mileage: { type: Number, required: true },
    color: { type: String },
    engine: { type: String, required: true },
    description: { type: String },
     image: { type: [String], default: [] },
    sellerName: {type: String, required: true,},
      sellerPhone: {type: String, required: true,},
     sellerLocation: {type: String, required: true,},
     sellerImage: {type: String, default: ""},
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

