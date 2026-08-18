export interface SendEmailPayload {
  to: string;
  subject: string;
  html?: string;
  type?: 'welcome' | 'order_receipt' | 'broadcast';
  details?: any;
}

export async function sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { success: response.ok, message: data.message || 'Email sent' };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, message: error.message || 'Email dispatch failed' };
  }
}

export async function sendWelcomeVipEmail(email: string, fullName: string, brandName: string = 'MAISON LUMIÈRE') {
  const subject = `✨ Welcome to the ${brandName} VIP Club!`;
  const html = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf8f5; border: 1px solid #ecd09f; rounded: 16px;">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #c5a059;">
        <h1 style="color: #18161b; letter-spacing: 2px; margin: 0; font-size: 24px;">${brandName}</h1>
        <p style="color: #b88d3e; font-style: italic; margin-top: 4px; font-size: 13px;">Jewelry, Luxury Couture & Botanical Cosmetics</p>
      </div>

      <div style="padding: 20px 0; color: #2a2521; line-height: 1.6; font-size: 15px;">
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>It is our absolute pleasure to welcome you to the <strong>${brandName} VIP Inner Circle</strong>.</p>
        <p>As a registered VIP member in Sierra Leone, you now enjoy:</p>
        <ul>
          <li><strong>30-Minute Priority Access</strong> to limited batch drops before public release</li>
          <li><strong>Exclusive 10% VIP Discount Codes</strong> on new silk couture & 18K gold jewelry</li>
          <li><strong>Direct WhatsApp Concierge Service</strong> for custom sizing & reservations</li>
        </ul>
        <p style="background: #ffffff; padding: 12px; border-left: 4px solid #c5a059; font-weight: bold;">
          🎁 Your VIP Welcome Code: <span style="color: #c5a059;">VIPCLUB10</span> (10% OFF your first order)
        </p>
      </div>

      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #ecd09f; color: #888; font-size: 11px;">
        <p>${brandName} Concierge Team &bull; 14 Wilberforce Street, Freetown, Sierra Leone</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html, type: 'welcome' });
}

export async function sendOrderReceiptEmail(
  email: string,
  customerName: string,
  referenceCode: string,
  totalAmount: number,
  paymentMethod: string,
  items: Array<{ title: string; quantity: number; price: number }>,
  brandName: string = 'MAISON LUMIÈRE'
) {
  const subject = `🛍️ Order Invoice & Receipt [${referenceCode}] - ${brandName}`;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">SLE ${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px;">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #18161b;">
        <h2 style="color: #18161b; margin: 0;">${brandName}</h2>
        <p style="color: #c5a059; margin: 4px 0; font-size: 12px; font-weight: bold;">ORDER CONFIRMATION & INVOICE</p>
      </div>

      <div style="padding: 16px 0; font-size: 14px; color: #333;">
        <p>Hello <strong>${customerName}</strong>,</p>
        <p>Thank you for shopping with ${brandName}. We have received your order reference <strong>${referenceCode}</strong>.</p>

        <div style="background: #faf6f0; padding: 12px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Order Ref:</strong> ${referenceCode}</p>
          <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p style="margin: 4px 0;"><strong>Total Amount:</strong> SLE ${totalAmount.toFixed(2)}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>Please send your Mobile Money transaction proof or reply on WhatsApp for dispatch updates.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html, type: 'order_receipt' });
}

export async function sendAdminPasswordResetEmail(
  email: string,
  resetPin: string,
  brandName: string = 'MAISON LUMIÈRE'
) {
  const subject = `🔐 Admin Password Reset Verification Code: [${resetPin}]`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; background: #121013; color: #ffffff; border: 1px solid #c5a059; border-radius: 16px;">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #333;">
        <h2 style="color: #c5a059; margin: 0; font-family: 'Times New Roman', serif;">${brandName}</h2>
        <p style="color: #aaa; margin: 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Admin Security Portal</p>
      </div>

      <div style="padding: 20px 0; text-align: center;">
        <p style="font-size: 14px; color: #ddd; margin-bottom: 20px;">
          You requested a password reset for your ${brandName} Admin Management Portal.
        </p>

        <div style="background: #18161b; border: 2px dashed #c5a059; padding: 18px; border-radius: 12px; display: inline-block; margin: 10px 0;">
          <span style="font-size: 11px; text-transform: uppercase; color: #888; display: block; margin-bottom: 4px;">Your 6-Digit Password Reset PIN</span>
          <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #c5a059; letter-spacing: 6px;">${resetPin}</span>
        </div>

        <p style="font-size: 12px; color: #888; margin-top: 20px;">
          Enter this verification code in the Admin Login portal to set your new password. This code will expire in 15 minutes.
        </p>
      </div>

      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #222; font-size: 11px; color: #555;">
        <p>If you did not request this password reset, please ignore this message.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html, type: 'broadcast' });
}

