const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotEnv = require("dotenv");
dotEnv.config();

// Gmail OAuth2 credentials from your .env or config
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.GOOGLE_EMAIL; // your Gmail address

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (email, name, token) => {
  try {
    // Get access token
    const accessToken = await oAuth2Client.getAccessToken();

    // Set up transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      to: email,
      subject: "Welcome to AutoHub Dealer 🚗 - Verify Your Account",
      from: `AutoHub Dealer <${SENDER_EMAIL}>`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="width: 100%; height: 200px; background-image: url('https://evaam.com/cdn/shop/collections/BS_banner_2160x_17f58eb3-a526-440f-9a7a-1a95a5fe6d53.webp?v=1723619377'); background-size: cover; background-position: center;"></div>
          <div style="padding: 2rem; text-align: center; background: #fff;">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 0.5rem;">Hello, ${name}</h2>
            <p style="color: #555; font-size: 16px; margin: 0.5rem 0;">Welcome to <strong>AutoHub Dealer</strong>! 🎉</p>
            <p style="color: #555; font-size: 16px; margin: 0.5rem 0;">Click the button below to verify your account and start buying & selling cars:</p>
            <a 
              href="https://autohub-dealership-frontend.onrender.com/verify/${token}"
              style="display: inline-block; margin: 1.5rem 0; background: #007bff; padding: 0.8rem 1.5rem; border-radius: 8px; color: #fff; text-decoration: none; font-weight: bold; font-size: 16px;"
            >
              ✅ Verify My Account
            </a>
            <p style="color: #999; font-size: 14px; margin-top: 1rem;">If you did not sign up, please ignore this email.</p>
          </div>
          <div style="background: #f4f4f4; padding: 1rem; text-align: center; font-size: 12px; color: #777;">
            AutoHub Dealer &copy; ${new Date().getFullYear()}
          </div>
        </div>
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
      replyTo: SENDER_EMAIL,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
};

module.exports = sendEmail;


