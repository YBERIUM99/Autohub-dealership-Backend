const { MailerSend, EmailParams } = require("mailersend");
const dotenv = require("dotenv");
dotenv.config();

// Initialize MailerSend client correctly
const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

// Function to send signup/verification email
const sendEmail = async (email, name, token) => {
  try {
    // Create email parameters
    const emailParams = new EmailParams()
      .setFrom("test-p7kx4xwvqqmg9yjr.mlsender.net") 
      .setTo([email])
      .setSubject("Welcome to AutoHub Dealer 🚗 - Verify Your Account")
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="width: 100%; height: 200px; background-image: url('https://evaam.com/cdn/shop/collections/BS_banner_2160x_17f58eb3-a526-440f-9a7a-1a95a5fe6d53.webp?v=1723619377'); background-size: cover; background-position: center;"></div>
          <div style="padding: 2rem; text-align: center; background: #fff;">
            <h2>Hello, ${name}</h2>
            <p>Welcome to <strong>AutoHub Dealer</strong>! 🎉</p>
            <p>Click the button below to verify your account and start buying & selling cars:</p>
            <a href="https://autohub-dealership-frontend.onrender.com/verify/${token}" style="display: inline-block; margin: 1.5rem 0; background: #007bff; padding: 0.8rem 1.5rem; border-radius: 8px; color: #fff; text-decoration: none; font-weight: bold;">✅ Verify My Account</a>
            <p style="color: #999;">If you did not sign up, please ignore this email.</p>
          </div>
          <div style="background: #f4f4f4; padding: 1rem; text-align: center; font-size: 12px; color: #777;">
            AutoHub Dealer &copy; ${new Date().getFullYear()}
          </div>
        </div>
      `);

    const response = await mailersend.email.send(emailParams);
    console.log("✅ Email sent successfully!", response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

module.exports = sendEmail;
