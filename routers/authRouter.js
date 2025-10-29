
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const dotenv = require("dotenv");
dotenv.config();

// ======================= REGISTER =======================
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; 

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      firstName, 
      lastName,  
      email,
      password: hashedPassword,
      verified: false,
    });
    await newUser.save();

    // generate email verification token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // send email
    sendEmail(email, `${firstName} ${lastName}`, token); // <-- fix here

    res.status(201).json({
      message: "User registered successfully. Please check your email to verify.",
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// ======================= LOGIN =======================
router.post("/login", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // check if verified
    if (!user.verified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // return token + user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// ======================= VERIFY EMAIL =======================
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    const path = require("path");
    const publicDir = path.join(__dirname, "../public");
    if (!user) {
      return res.status(400).sendFile(path.join(publicDir, "verify_failed.html"));
    }

    user.verified = true;
    await user.save();

    return res.status(200).sendFile(path.join(publicDir, "verify_success.html"));
  } catch (err) {
    const path = require("path");
    const publicDir = path.join(__dirname, "../public");
    return res.status(400).sendFile(path.join(publicDir, "verify_failed.html"));
  }
});

// ======================= GET CURRENT LOGGED-IN USER =======================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user }); // return user info
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});


// ======================= UPDATE PROFILE PICTURE =======================
router.patch("/profile-picture", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { profilePicture } = req.body;
    if (!profilePicture)
      return res.status(400).json({ message: "No profile picture provided" });

    user.profilePicture = profilePicture;
    await user.save();

    res.json({ message: "Profile picture updated successfully", profilePicture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile picture" });
  }
});

// ======================= UPDATE PROFILE INFO =======================
router.patch("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { phone, address, dob } = req.body;

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { phone, address, dob },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile info" });
  }
});



module.exports = router;





