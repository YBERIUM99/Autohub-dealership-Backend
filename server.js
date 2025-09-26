const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectToDb");
require("./config/cloudinary"); // ✅ just import to connect & test

const carRouter = require("./routers/carRouter");
const productRoutes = require("./routers/productRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/usersRouter"); // 👈 add this

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://autohub-dealership.vercel.app",
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://autohub-dealership.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.static("public"));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter); // 👈 Cloudinary upload endpoint here

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));









