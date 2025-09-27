const { google } = require("googleapis");
const dotEnv = require("dotenv");
dotEnv.config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.GOOGLE_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

async function sendEmail(email, name, token) {
  const subject = "Welcome to AutoHub Dealer 🚗 - Verify Your Account";
  const message = `
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
  `;

  // Prepare the raw RFC822 email
  const rawMessage = [
    `From: AutoHub Dealer <${SENDER_EMAIL}>`,
    `To: ${email}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    message,
  ].join("\n");

  const encodedMessage = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("✅ Email sent via Gmail API:", res.data.id);
  } catch (err) {
    console.error("❌ Gmail API error:", err);
  }
}

module.exports = sendEmail;


