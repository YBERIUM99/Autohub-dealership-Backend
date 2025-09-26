const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, // use TLS
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer error:", err);
  } else {
    console.log("✅ Nodemailer is ready to send email via Brevo!");
  }
});

module.exports = transporter;
