const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectToDb");

const carRouter = require("./routers/carRouter");
const productRoutes = require("./routers/productRouter"); // ✅ path must exist

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/cars", carRouter);
app.use("/api/products", productRoutes); // ✅ should mount correctly

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

