const transporter = require("../config/nodemailerTransporter");
const dotEnv = require("dotenv");

dotEnv.config();

const sendEmail = (email, name, token) => {
  transporter.sendMail(
    {
      to: email,
      subject: "Welcome to AutoHub Dealer 🚗 - Verify Your Account",
      from: `AutoHub Dealer <${process.env.BREVO_USER}>`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Banner Image -->
          <div style="width: 100%; height: 200px; background-image: url('https://evaam.com/cdn/shop/collections/BS_banner_2160x_17f58eb3-a526-440f-9a7a-1a95a5fe6d53.webp?v=1723619377'); background-size: cover; background-position: center;"></div>
          
          <!-- Email Content -->
          <div style="padding: 2rem; text-align: center; background: #fff;">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 0.5rem;">Hello, ${name}</h2>
            <p style="color: #555; font-size: 16px; margin: 0.5rem 0;">Welcome to <strong>AutoHub Dealer</strong>! 🎉</p>
            <p style="color: #555; font-size: 16px; margin: 0.5rem 0;">Click the button below to verify your account and start buying & selling cars:</p>

            <a 
              href="https://autohub-dealership.vercel.app/verify/${token}"
              style="display: inline-block; margin: 1.5rem 0; background: #007bff; padding: 0.8rem 1.5rem; border-radius: 8px; color: #fff; text-decoration: none; font-weight: bold; font-size: 16px;"
            >
              ✅ Verify My Account
            </a>

            <p style="color: #999; font-size: 14px; margin-top: 1rem;">If you did not sign up, please ignore this email.</p>
          </div>

          <!-- Footer -->
          <div style="background: #f4f4f4; padding: 1rem; text-align: center; font-size: 12px; color: #777;">
            AutoHub Dealer &copy; ${new Date().getFullYear()}
          </div>
        </div>

        <!-- Responsive styles for mobile -->
        <style>
          @media only screen and (max-width: 600px) {
            div[style*='max-width: 600px'] {
              width: 95% !important;
              padding: 0 !important;
            }
            h2 {
              font-size: 20px !important;
            }
            a {
              width: 90% !important;
              font-size: 16px !important;
              padding: 0.7rem 1rem !important;
            }
            div[style*='padding: 2rem'] {
              padding: 1rem !important;
            }
          }
        </style>
      `,
      replyTo: process.env.BREVO_USER,
    },
    (err, info) => {
      if (err) {
        console.error("❌ Email error:", err);
      } else {
        console.log("✅ Email sent!");
      }
    }
  );
};

module.exports = sendEmail;


