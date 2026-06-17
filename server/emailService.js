import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendExpiryEmail(services) {
  const html = `
    <h2>Services Expiring Soon</h2>

    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <th>Service</th>
        <th>Type</th>
        <th>Expiry Date</th>
      </tr>

      ${services
        .map(
          (service) => `
          <tr>
            <td>${service.service_name}</td>
            <td>${service.service_type}</td>
            <td>${service.expiry_date}</td>
          </tr>
        `
        )
        .join("")}
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "sivapriyamr4@gmail.com",
    subject: "Teqid Expiry Reminder",
    html,
  });
}