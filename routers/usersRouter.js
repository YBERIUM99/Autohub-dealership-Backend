const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth");
const User = require("../models/userModel"); 
const cloudinary = require("../config/cloudinary");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.put("/profile-picture", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
      public_id: `user_${userId}`,
      overwrite: true,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    res.json({ message: "Profile picture updated", profilePicture: user.profilePicture });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
});

module.exports = router;

