
const { transporter, MAIL_FROM } = require('../config/mail');


async function sendMail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email address is required');

  const info = await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject,
    html,
  });

  return info;
}

/**
 * Sent when a new user (student/teacher) is onboarded.
 */
async function sendWelcomeEmail({ to, name, role }) {
  const subject = 'Welcome to the School Record Management System';
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome, ${name}!</h2>
      <p>Your account has been created successfully as a <strong>${role}</strong>.</p>
      <p>You can now log in and start using the platform.</p>
      <p>— School Record Management Team</p>
    </div>
  `;
  return sendMail({ to, subject, html });
}

/**
 * Sent to a student/guardian when a new result is published.
 */
async function sendResultNotification({ to, studentName, term, session, subjects }) {
  const subject = `${term} ${session} Result Published`;

  const rows = subjects
    .map(
      (s) => `
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;">${s.name}</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${s.totalScore}</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${s.grade}</td>
      </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Result Notification</h2>
      <p>Dear ${studentName}, your result for <strong>${term} ${session}</strong> has been published.</p>
      <table style="border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th style="padding:6px 10px;border:1px solid #ddd;">Subject</th>
            <th style="padding:6px 10px;border:1px solid #ddd;">Score</th>
            <th style="padding:6px 10px;border:1px solid #ddd;">Grade</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p>Log in to the portal to view your full report card.</p>
    </div>
  `;
  return sendMail({ to, subject, html });
}

/**
 * Sent when a user requests a password reset (optional feature).
 */
async function sendPasswordResetEmail({ to, name, resetLink }) {
  const subject = 'Password Reset Request';
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset</h2>
      <p>Hi ${name}, we received a request to reset your password.</p>
      <p>
        <a href="${resetLink}" style="background:#2563eb;color:#fff;padding:10px 18px;
           border-radius:6px;text-decoration:none;display:inline-block;">
          Reset Password
        </a>
      </p>
      <p>This link expires in 1 hour. If you did not request this, please ignore this email.</p>
    </div>
  `;
  return sendMail({ to, subject, html });
}

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendResultNotification,
  sendPasswordResetEmail,
};
