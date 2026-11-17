import nodemailer from 'nodemailer';

// Sends via Google Apps Script webhook if configured, else SMTP. Returns false if neither is set.
export async function sendEmail({ to, subject, html }) {
  try {
    if (process.env.GAS_EMAIL_WEBHOOK_URL) {
      const r = await fetch(process.env.GAS_EMAIL_WEBHOOK_URL, {
        method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ to, subject, html }),
      });
      return r.ok;
    }
    if (process.env.SMTP_HOST) {
      const t = nodemailer.createTransport({
        host: process.env.SMTP_HOST, port: +(process.env.SMTP_PORT || 587),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await t.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
      return true;
    }
  } catch (e) { console.error('email failed', e.message); }
  return false;
}

export const welcomeEmail = ({ name, restaurant, email, password, url }) => ({
  subject: `Welcome to DineOS — ${restaurant} is approved`,
  html: `<div style="font-family:sans-serif"><h2>Welcome, ${name}!</h2>
  <p>Your restaurant <b>${restaurant}</b> has been approved.</p>
  <p>Login: <a href="${url}/login">${url}/login</a><br/>Email: <b>${email}</b><br/>Temporary password: <b>${password}</b></p>
  <p>Please change this password after your first login.</p></div>`,
});
