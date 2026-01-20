const sendEmail = async (transport, html) => {
  const info = await transport.sendMail({
    from: '"Mavriq AI" <mavriq@mavriq.co.in>',
    to: "client@mavriq.co.in",
    subject: "Dev Test Email",
    text: "Hello world?",
    html,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = {sendEmail};