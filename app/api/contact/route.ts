import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const to = [
      process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
      process.env.NOTIFY_EMAIL_ALT,
    ].filter(Boolean).join(',');

    const now = new Date().toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: email,
      subject: `📬 New message from ${name} — Portfolio Contact`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)">
        <tr><td style="background:linear-gradient(135deg,#4f46e5 0%,#3b82f6 100%);padding:32px 40px">
          <span style="font-size:20px;vertical-align:middle;margin-right:10px">📬</span>
          <span style="color:#fff;font-size:20px;font-weight:700;vertical-align:middle">New Portfolio Inquiry</span>
        </td></tr>
        <tr><td style="padding:32px 40px">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
            <tr>
              <td style="padding:12px 16px;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:48%">
                <div style="color:#a5b4fc;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">From</div>
                <div style="color:#f1f5f9;font-size:15px;font-weight:600">${name}</div>
              </td>
              <td style="width:4%"></td>
              <td style="padding:12px 16px;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:48%">
                <div style="color:#a5b4fc;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Email</div>
                <div style="color:#60a5fa;font-size:14px;font-weight:500">${email}</div>
              </td>
            </tr>
          </table>
          <div style="color:#94a3b8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Message</div>
          <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px 24px;color:#e2e8f0;font-size:15px;line-height:1.75;white-space:pre-wrap">${message}</div>
          <div style="margin-top:28px;text-align:center">
            <a href="mailto:${email}?subject=Re: Your Portfolio Inquiry"
               style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#4f46e5,#3b82f6);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600">
              Reply to ${name} →
            </a>
          </div>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2)">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color:#475569;font-size:12px">${now}</td>
              <td align="right" style="color:#475569;font-size:12px">hailemariam-eyayu.dev</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Email error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
