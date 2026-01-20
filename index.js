const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { sendMessage } = require("./send-wa-msg");
const { sendEmail } = require("./send-mail");
const { extractMessage } = require("./extract-message");
const dummyData = require('./dummy.json')

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

app.post("/webhook", async (req, res) => {
  const { whatsappMessage, emailHtml, error } = extractMessage(dummyData);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to extract data"
    });
  }

  try {
    const results = await Promise.allSettled([
      // sendMessage("919411187503", whatsappMessage),
      sendEmail(transport, emailHtml)
    ]);
    const rejected = results.filter(r => r.status === 'rejected');
    if (rejected.length === 2) {
      console.log("Both messages failed to send.");
      throw rejected[0].reason;
    }
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});