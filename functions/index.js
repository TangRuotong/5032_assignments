console.log("PawerUp Firebase Functions initializing...");

exports.runtimeOptions = {
  timeoutSeconds: 60,
  memory: "512MB",
};

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
const db = admin.firestore();

function initSendGrid() {
  if (functions.config().sendgrid?.key) {
    sgMail.setApiKey(functions.config().sendgrid.key);
  }
}

exports.sendContact = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")
    return res.status(405).send("Only POST requests are allowed");
  initSendGrid();
  const { name, email, phone, service, message, source, attachment } =
    req.body || {};
  if (!name || !email || !message || !service)
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  const msg = {
    to: "tina1319980173@gmail.com",
    from: {
      email: "tina1319980173@gmail.com",
      name: `${name} (via PawerUp Contact Form)`,
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
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

exports.addInboxMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in"
    );
  const { uid, title, message, details } = data || {};
  if (!uid || !title || !message)
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required message fields"
    );
  await db
    .collection("inboxes")
    .doc(uid)
    .collection("msgs")
    .add({
      title,
      message,
      details: details || {},
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  return { success: true };
});

exports.getInboxMessages = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in"
    );
  const { uid } = data || {};
  if (!uid)
    throw new functions.https.HttpsError("invalid-argument", "Missing user ID");
  const snap = await db
    .collection("inboxes")
    .doc(uid)
    .collection("msgs")
    .orderBy("timestamp", "desc")
    .limit(20)
    .get();
  const msgs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { msgs };
});

exports.sendBulkMessage = functions.https.onRequest(async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ status: "error", message: "Only POST requests allowed" });
  let data = req.body;
  if (!data || Object.keys(data).length === 0) {
    try {
      data = JSON.parse(req.rawBody.toString());
    } catch {
      return res.status(400).json({ status: "error", message: "Invalid JSON" });
    }
  }
  const { title, message } = data || {};
  if (!title || !message)
    return res
      .status(400)
      .json({ status: "error", message: "Missing title or message" });
  const usersSnap = await db.collection("users").get();
  if (usersSnap.empty)
    return res.status(200).json({ status: "ok", message: "No users found." });
  const batch = db.batch();
  usersSnap.forEach((doc) => {
    const msgRef = db
      .collection("inboxes")
      .doc(doc.id)
      .collection("msgs")
      .doc();
    batch.set(msgRef, {
      title,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  return res.status(200).json({ status: "ok", count: usersSnap.size });
});
