const sendEmail = async (client, html) => {
  try {
    const info = await client
      .send({
        from: { email: "ganesha@mavriq.co.in", name: "Ganesha Bookings" },
        to: [{ email: "chauhan.divyansh03@gmail.com" }],
        subject: "New reservation received",
        text: "New reservation received",
        html,
      })


    console.log("Message sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };