const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS
    }
})

transporter.verify((err, success) => {
    if (!success) {
        console.log(err)
    } else {
        console.log("Nodemailer is ready to send email!")
    }
})

module.exports = transporter