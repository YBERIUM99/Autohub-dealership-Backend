const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const FROM_EMAIL = "no-reply@test-p7kx4xwvqqmg9yjr.mlsender.net"; 
const FROM_NAME = "AutoHub Dealer";

// Health check to verify API key and setup
const verifyMailer = async () => {
  try {
    const response = await fetch("https://api.mailersend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("✅ MailerSend is ready to send emails!");
    } else {
      const err = await response.json();
      console.error("❌ MailerSend verification failed:", err);
    }
  } catch (error) {
    console.error("❌ Error verifying MailerSend:", error);
  }
};

// Call verification when dev server starts
verifyMailer();

// Function to send signup/verification email
const sendEmail = async (email, name, token) => {
  try {
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email, name }],
        subject: "Welcome to AutoHub Dealer 🚗 - Verify Your Account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="width: 100%; height: 200px; background-image: url('https://evaam.com/cdn/shop/collections/BS_banner_2160x_17f58eb3-a526-440f-9a7a-1a95a5fe6d53.webp?v=1723619377'); background-size: cover; background-position: center;"></div>
            <div style="padding: 2rem; text-align: center; background: #fff;">
              <h2 style="color: #333;">Hello, ${name}</h2>
              <p>Welcome to <strong>AutoHub Dealer</strong>! 🎉</p>
              <p>Click below to verify your account:</p>
              <a href="https://autohub-dealership-frontend.onrender.com/verify/${token}"
                 style="display:inline-block; margin:1.5rem 0; background:#007bff; padding:0.8rem 1.5rem; border-radius:8px; color:#fff; text-decoration:none; font-weight:bold;">
                 ✅ Verify My Account
              </a>
              <p style="color:#999;font-size:14px;margin-top:1rem;">If you did not sign up, ignore this email.</p>
            </div>
            <div style="background:#f4f4f4; padding:1rem; text-align:center; font-size:12px; color:#777;">
              AutoHub Dealer &copy; ${new Date().getFullYear()}
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw data;

    console.log("✅ Email sent successfully!", data);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

module.exports = sendEmail;





