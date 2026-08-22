import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT) || 587,
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

try {
  await transporter.verify();
  console.log("[mail] Mail server is ready to send messages.");
} catch (error) {
  console.error("[mail] Transporter configuration error:", error.message);
}

export const MAIL_FROM =
  process.env.MAIL_FROM || '"School Record Management" <schoolmgt0@gmail.com>';