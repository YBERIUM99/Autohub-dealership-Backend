const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const authMiddleware = require("../middlewares/auth"); // Optional JWT check

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// For file upload handling
const upload = multer({ dest: "uploads/" });

router.put("/profile-picture", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
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
    console.error(err);
    res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
});
