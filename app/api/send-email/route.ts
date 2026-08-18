import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, type, details } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required parameters: to, subject' },
        { status: 400 }
      );
    }

    // Process Email sending via configured API provider (e.g. Resend, Gmail SMTP, SendGrid)
    // Environment variables like RESEND_API_KEY or SMTP_USER can be configured in live hosting.
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Live Resend API integration call
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Maison Lumière <concierge@maisonlumiere.sl>',
          to: [to],
          subject: subject,
          html: html || `<p>${subject}</p>`,
        }),
      });

      if (!resendRes.ok) {
        const errData = await resendRes.json();
        console.error('Resend API error:', errData);
      }
    } else {
      // Demo log output for client showcase
      console.log(`[EMAIL DEMO DISPATCH] To: ${to} | Subject: ${subject}`);
    }

    return NextResponse.json({
      success: true,
      message: `Email notification queued successfully for ${to}`,
      timestamp: new Date().toISOString(),
      mode: resendApiKey ? 'LIVE' : 'DEMO_SIMULATED',
    });
  } catch (error: any) {
    console.error('Email API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
