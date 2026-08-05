
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.MAIL_PORT) || 587,
  secure: process.env.MAIL_PORT === '465', // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify connection configuration on startup
transporter.verify((error) => {
  if (error) {
    console.error('[mail] Transporter configuration error:', error.message);
  } else {
    console.log('[mail] Mail server is ready to send messages');
  }
});

const MAIL_FROM = process.env.MAIL_FROM || '"School Record Management" <no-reply@school.com>';

module.exports = { transporter, MAIL_FROM };
