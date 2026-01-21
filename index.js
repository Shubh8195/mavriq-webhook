const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { sendMessage } = require("./services/send-wa-msg");
const { sendEmail } = require("./services/send-mail");
const { extractMessage } = require("./helper/extract-message");
const dummyData = require('./constant/dummy.json')

var transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  }
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/webhook/send-notification", async (req, res) => {
  console.log("Received webhook:", req.body);
  const { whatsappMessage, emailHtml, error } = extractMessage(dummyData);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to extract data"
    });
  }

  try {
    // const results = await Promise.allSettled([
    //   sendMessage("919411187503", whatsappMessage),
    //   sendEmail(transport, emailHtml)
    // ]);

    // const rejected = results.filter(r => r.status === 'rejected');
    // if (rejected.length === 2) {
    //   console.log("Both messages failed to send.");
    //   throw rejected[0].reason;
    // }
  } catch (err) {
    console.error("Error sending messages:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send messages"
    });
  }
  res.status(200).json({
    success: true,
    message: "Messages sent successfully"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});