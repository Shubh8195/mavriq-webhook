const express = require("express");
const { MailtrapClient } = require("mailtrap");
const cors = require("cors");
require("dotenv").config();

const { sendMessage } = require("./services/send-wa-msg");
const { sendEmail } = require("./services/send-mail");
const { extractMessage } = require("./helper/extract-message");

const TOKEN = process.env.MAILTRAP_TOKEN;

const transport = new MailtrapClient({
  token: "11ad44003a2e46f5bf8e6d6372f465d6",
  // sandbox: true,
  // testInboxId: 4149893,
});

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost";

app.use(express.json());

app.use(
  cors({
    origin: [/\.elevenlabs\.io$/],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.post("/webhook/send-notification", async (req, res) => {
  const { whatsappMessage, emailHtml, error } = extractMessage(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to extract data"
    });
  }

  try {
    const results = await Promise.allSettled([
      sendMessage("919411187503", whatsappMessage),
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

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on ${API_URL}:${PORT}`);
});