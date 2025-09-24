const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
   lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  verified: { type: Boolean, default: false },
   profilePicture: { type: String, default: "" },
    phone: { type: String, default: "" },
  address: { type: String, default: "" },
  dob: { type: String, default: "" }, 
});

module.exports = mongoose.model("User", userSchema);

