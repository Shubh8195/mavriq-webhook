const sendEmail = async (transport, html) => {
  const info = await transport.sendMail({
    from: '"Ganesha Bookings" <ganesha@mavriq.co.in>',
    to: "chauhan.divyansh03@gmail.com",
    subject: "New reservation received",
    text: "New reservation received",
    html,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = {sendEmail};