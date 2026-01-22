const sendEmail = async (transport, html) => {
  const info = await transport.sendMail({
    from: '"Mavriq AI" <mavriq@mavriq.co.in>',
    to: "client@mavriq.co.in",
    subject: "New reservation received",
    text: "New reservation received",
    html,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = {sendEmail};