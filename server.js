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

// ✅ CORS middleware
app.use(
  cors({
    origin: "https://autohub-dealership-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Explicit headers middleware (your version)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://autohub-dealership.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
//   // ⚡ Handle preflight (OPTIONS) requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
  
//   next();
// });

app.use(express.json());
app.use(express.static("public"));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





