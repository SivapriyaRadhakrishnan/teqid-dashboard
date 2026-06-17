const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendExpiryEmail(serviceName) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "sivapriyamr4@gmail.com",
    subject: "Service Expiry Alert",
    html: `
      <h2>Service Expiring Soon</h2>
      <p>${serviceName} will expire soon.</p>
    `,
  });
}

module.exports = { sendExpiryEmail };