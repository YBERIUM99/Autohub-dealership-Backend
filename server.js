const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectToDb");

const carRouter = require("./routers/carRouter");
const productRoutes = require("./routers/productRouter");
const authRouter = require("./routers/authRouter");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://autohub-dealership.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




