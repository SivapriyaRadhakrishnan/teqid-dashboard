import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { supabase } from "./supabase.js";
import { sendExpiryEmail } from "./emailService.js";

const app = express();

app.use(cors());
app.use(express.json());

async function checkExpiryAndSendMail() {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*");

    if (error) throw error;

    const today = new Date();

    const expiringServices = services.filter((service) => {
      const expiryDate = new Date(service.expiry_date);

      const diffDays = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
      );

      return diffDays >= 0 && diffDays <= 7;
    });

    if (expiringServices.length > 0) {
      await sendExpiryEmail(expiringServices);

      console.log(
        `Email sent for ${expiringServices.length} expiring services`
      );
    } else {
      console.log("No expiring services found");
    }

    return expiringServices;
  } catch (error) {
    console.error("Expiry Check Error:", error);
    throw error;
  }
}

app.get("/check-expiry", async (req, res) => {
  try {
    const services = await checkExpiryAndSendMail();

    res.json({
      success: true,
      totalFound: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});