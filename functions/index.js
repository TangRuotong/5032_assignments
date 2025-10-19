const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendContact = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")
    return res.status(405).send("Only POST requests are allowed");

  const { name, email, phone, service, message, source, attachment } =
    req.body || {};

  if (!name || !email || !message || !service) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  const msg = {
    to: "tina1319980173@gmail.com",
    from: {
      email: "tina1319980173@gmail.com",
      name: `${name} (via PawerUp Contact Form)`,
    },
    replyTo: email,
    subject: `New enquiry about ${service}`,
    text: `Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Service: ${service}
Source: ${source || "N/A"}

Message:
${message}`,
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
    console.log("✅ Email sent from:", email, "about:", service);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

exports.addInboxMessage = functions.https.onCall(async (data, context) => {
  const { uid, title, message, details } = data || {};

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in"
    );
  }

  if (!uid || !title || !message) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required message fields"
    );
  }

  const msgDoc = {
    title,
    message,
    details: details || {},
    read: false,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("inboxes").doc(uid).collection("msgs").add(msgDoc);
  console.log("Message added to inbox:", uid, "-", title);
  return { success: true };
});

exports.getInboxMessages = functions.https.onCall(async (data, context) => {
  const { uid } = data || {};

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in"
    );
  }

  if (!uid) {
    throw new functions.https.HttpsError("invalid-argument", "Missing user ID");
  }

  const snap = await db
    .collection("inboxes")
    .doc(uid)
    .collection("msgs")
    .orderBy("timestamp", "desc")
    .limit(20)
    .get();

  const msgs = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(`Loaded ${msgs.length} messages for user ${uid}`);
  return { msgs };
});
