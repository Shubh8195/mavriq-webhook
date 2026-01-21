const sendMessage = async (to, message) => {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
 
  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to, // Example: "1234567890"
        type: "text",
        text: { body: message },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      throw new Error("Failed to send WhatsApp message");
    }

    console.log("Message sent:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

module.exports = { sendMessage };
