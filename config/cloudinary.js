const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Ping Cloudinary to confirm connection
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("❌ Cloudinary not connected:", error.message);
  } else {
    console.log("✅ Cloudinary connected");
  }
});

module.exports = cloudinary;
