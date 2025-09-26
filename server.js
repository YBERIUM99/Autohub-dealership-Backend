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

// ✅ CORS middleware (this is enough)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://autohub-dealership.vercel.app", // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Remove your manual res.setHeader block (no need for it)

// Middleware
app.use(express.json());
app.use(express.static("public"));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ AutoHub Backend is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



