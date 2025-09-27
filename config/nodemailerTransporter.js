// const nodemailer = require('nodemailer');
// const dotenv = require("dotenv");
// dotenv.config();

// const transporter = nodemailer.createTransport({
//     host: "smtp.mailersend.net",
//     port: 587,           // Use 587 for STARTTLS
//     secure: false,       // true if using port 465
//     auth: {
//         user: process.env.MAILERSEND_SMTP_USER, // usually your MailerSend SMTP token
//         pass: process.env.MAILERSEND_SMTP_PASS  // or password if they require one
//     },
//     logger: true,   // Logs SMTP traffic
//     debug: true  
// });

// // Verify the transporter
// transporter.verify((err, success) => {
//     if (!success) {
//         console.log("Error connecting to MailerSend SMTP:", err);
//     } else {
//         console.log("MailerSend SMTP is ready to send email!");
//     }
// });

// module.exports = transporter;
