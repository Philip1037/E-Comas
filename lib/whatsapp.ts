import { CartItem, PaymentMethod, BoutiqueSettings } from './types';

export interface CustomerOrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  referenceCode?: string;
}

export function compileWhatsAppMessage(
  details: CustomerOrderDetails,
  items: CartItem[],
  grandTotal: number,
  settings: BoutiqueSettings
): string {
  const brandName = settings.brand_name || "MAISON LUMIÈRE";

  const formattedItems = items
    .map((item, index) => {
      const unitPrice = item.product.price.toFixed(2);
      const lineTotal = (item.product.price * item.quantity).toFixed(2);
      return `${index + 1}. ${item.product.title}
   • Qty: ${item.quantity} | Price: SLE ${unitPrice} | Line Total: SLE ${lineTotal}`;
    })
    .join('\n');

  const refString = details.referenceCode ? `🔖 *Ref Code:* ${details.referenceCode}\n` : '';

  const message = `🛍️ *NEW ORDER - ${brandName}*
-----------------------------------------
${refString}👤 *Customer:* ${details.customerName}
📍 *Delivery Address:* ${details.deliveryAddress}
📞 *Contact Phone:* ${details.customerPhone}
💳 *Payment Choice:* ${details.paymentMethod}
-----------------------------------------
📦 *Items Ordered:*
${formattedItems}

-----------------------------------------
💰 *Grand Total:* SLE ${grandTotal.toFixed(2)}
-----------------------------------------
_Please reply to confirm availability and dispatch!_`;

  return message;
}

export function generateWhatsAppCheckoutUrl(
  adminPhone: string,
  details: CustomerOrderDetails,
  items: CartItem[],
  grandTotal: number,
  settings: BoutiqueSettings
): string {
  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  const message = compileWhatsAppMessage(details, items, grandTotal, settings);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function generateVipBroadcastWhatsAppUrl(
  productTitle: string,
  price: number,
  category: string,
  vipDiscountCode: string = "VIPLUMIERE10",
  adminPhone: string
): string {
  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  const message = `✨ *VIP EXCLUSIVE DROP: ${productTitle.toUpperCase()}* ✨
-----------------------------------------
👗 *Category:* ${category}
💎 *Price:* SLE ${price.toFixed(2)}
🎁 *VIP Privilege:* Use code *${vipDiscountCode}* for 10% OFF your first order!

Tap here to shop before public release:
${typeof window !== 'undefined' ? window.location.origin : 'https://maisonlumiere.sl'}

Reply *RESERVE* with your size to secure immediate priority dispatch!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function compileUSSDCode(
  method: PaymentMethod,
  amount: number,
  settings: BoutiqueSettings
): string {
  if (method === 'Orange Money') {
    const merchantId = settings.orange_money_merchant_id || "OM-882190";
    const template = settings.orange_money_ussd_template || "*144*3*{MERCHANT_ID}*{AMOUNT}#";
    return template.replace('{MERCHANT_ID}', merchantId).replace('{AMOUNT}', amount.toFixed(0));
  } else if (method === 'AfriMoney') {
    const merchantId = settings.afrimoney_merchant_id || "AF-550192";
    const template = settings.afrimoney_ussd_template || "*161*2*{MERCHANT_ID}*{AMOUNT}#";
    return template.replace('{MERCHANT_ID}', merchantId).replace('{AMOUNT}', amount.toFixed(0));
  }
  return '';
}

export function getWhatsAppGroupUrl(settings: BoutiqueSettings): string {
  return settings.whatsapp_group_link || "https://chat.whatsapp.com/LumiereVIPClubDemo";
}

export function generateGroupBroadcastWhatsAppUrl(
  productTitle: string,
  price: number,
  category: string,
  settings: BoutiqueSettings,
  vipDiscountCode: string = "VIPCLUB10"
): string {
  const brandName = settings.brand_name || "MAISON LUMIÈRE";
  const cleanPhone = (settings.admin_whatsapp || "23276889900").replace(/[^0-9]/g, '');
  const message = `✨ *[${brandName}] VIP GROUP DROP: ${productTitle.toUpperCase()}* ✨
-----------------------------------------
👗 *Category:* ${category}
💎 *Special Price:* SLE ${price.toFixed(2)}
🎁 *VIP Privilege:* Use code *${vipDiscountCode}* for 10% OFF!

Tap here to order on our official website:
${typeof window !== 'undefined' ? window.location.origin : 'https://maisonlumiere.sl'}

Reply *RESERVE* with your size to secure priority dispatch!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generatePrivateVIPBroadcastWhatsAppUrl(
  phone: string,
  customerName: string,
  customMessage: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const personalizedMsg = `Hello ${customerName} 👋,\n\n${customMessage}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(personalizedMsg)}`;
}

