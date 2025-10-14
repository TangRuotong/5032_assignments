const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendContact = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")
    return res.status(405).send("Only POST requests are allowed");

  const { name, email, phone, service, message, source, attachment } = req.body;
  if (!name || !email || !message || !service)
    return res
      .status(400)
      .send({ success: false, error: "Missing required fields" });

  const msg = {
    to: "tina1319980173@gmail.com",
    from: {
      email: "tina1319980173@gmail.com",
      name: name + " (via PawerUp Contact Form)",
    },
    replyTo: email,
    subject: `New enquiry about ${service}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${
      phone || "N/A"
    }\nService: ${service}\nSource: ${source || "N/A"}\n\nMessage:\n${message}`,
  };

  if (attachment) {
    msg.attachments = [
      {
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: "attachment",
      },
    ];
  }

  try {
    await sgMail.send(msg);
    console.log("Email sent from:", email, "about:", service);
    return res
      .status(200)
      .send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).send({ success: false, error: error.message });
  }
});
