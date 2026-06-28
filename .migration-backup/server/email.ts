import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "m.graham@live.ca";

let transporter: nodemailer.Transporter | null = null;

try {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
} catch (err) {
  console.log("Email transport not configured, submissions will be stored in database only.");
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}) {
  if (!transporter) {
    console.log("Contact submission stored (email delivery not configured):", data.email);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT_EMAIL,
      subject: `New Contact from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        <h3>Message:</h3>
        <p>${data.message}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
  }
}

export async function sendProjectEmail(data: {
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features: string[];
}) {
  if (!transporter) {
    console.log("Project submission stored (email delivery not configured):", data.email);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT_EMAIL,
      subject: `New Project: ${data.projectType} from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `
        <h2>New Project Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <h3>Description:</h3>
        <p>${data.description}</p>
        <h3>Features:</h3>
        <ul>${data.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      `,
    });
  } catch (err) {
    console.error("Failed to send project email:", err);
  }
}
