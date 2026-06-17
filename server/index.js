require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sendExpiryEmail } = require("./emailService");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    await sendExpiryEmail(req.body.serviceName);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running");
});