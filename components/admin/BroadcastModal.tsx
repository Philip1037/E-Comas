'use client';

import React, { useState } from 'react';
import { Product, BoutiqueSettings, Subscriber } from '@/lib/types';
import { generateVipBroadcastWhatsAppUrl, getWhatsAppGroupUrl } from '@/lib/whatsapp';
import { sendEmail } from '@/lib/email';
import { X, Send, Copy, Check, Sparkles, Mail, Phone, ExternalLink, Users } from 'lucide-react';



interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  subscribers: Subscriber[];
  settings: BoutiqueSettings;
}

export default function BroadcastModal({
  isOpen,
  onClose,
  product,
  subscribers,
  settings,
}: BroadcastModalProps) {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [discountCode, setDiscountCode] = useState('VIPLUMIERE10');
  const [emailDispatched, setEmailDispatched] = useState(false);

  if (!isOpen || !product) return null;

  const rawMessage = `✨ *VIP EXCLUSIVE DROP: ${product.title.toUpperCase()}* ✨
-----------------------------------------
👗 *Category:* ${product.category_name || 'Boutique Couture'}
💎 *Price:* SLE ${product.price.toFixed(2)}
🎁 *VIP Privilege:* Use code *${discountCode}* for 10% OFF your first order!

Tap here to shop before public release:
${typeof window !== 'undefined' ? window.location.origin : 'https://maisonlumiere.sl'}

Reply *RESERVE* with your size to secure immediate priority dispatch!`;

  const emailSubject = `VIP Early Drop: ${product.title} has landed at Maison Lumière`;
  const emailBody = `Dear Maison Lumière VIP,\n\nWe are delighted to present our freshest arrival before public release: ${product.title}.\n\nPrice: SLE ${product.price.toFixed(2)}\nCategory: ${product.category_name}\n\nAs our registered VIP member, use discount code ${discountCode} for 10% off.\n\nShop now: ${typeof window !== 'undefined' ? window.location.origin : 'https://maisonlumiere.sl'}\n\nWarm regards,\nMaison Lumière Concierge Team`;

  const whatsAppUrl = generateVipBroadcastWhatsAppUrl(
    product.title,
    product.price,
    product.category_name || 'Couture',
    discountCode,
    settings.admin_whatsapp
  );

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTriggerEmailDispatch = async () => {
    const subscribersWithEmail = subscribers.filter((s) => s.email && s.email.includes('@'));
    if (subscribersWithEmail.length === 0) {
      alert('No subscribers with valid email addresses found.');
      return;
    }

    setEmailDispatched(true);

    try {
      await Promise.all(
        subscribersWithEmail.map((sub) =>
          sendEmail({
            to: sub.email!,
            subject: emailSubject,
            html: `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2 style="color: #18161b;">${settings.brand_name || 'Maison Lumière'} VIP Drop</h2><p>Dear ${sub.full_name},</p><p>${emailBody.replace(/\n/g, '<br/>')}</p></div>`,
            type: 'broadcast',
          })
        )
      );
    } catch (err) {
      console.error('Bulk email dispatch error:', err);
    }

    setTimeout(() => {
      setEmailDispatched(false);
    }, 4000);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#18161b] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f5ebd7]">
                VIP Drop Broadcast Dispatcher
              </h3>
              <p className="text-xs text-stone-400">
                Dispatch alerts to {subscribers.length} registered VIP phone numbers &amp; emails
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Product Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80'}
              alt={product.title}
              className="w-12 h-14 rounded-xl object-cover"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b88d3e]">Target Product</span>
              <h4 className="text-xs font-bold text-stone-900">{product.title}</h4>
              <p className="text-xs font-semibold text-stone-600">SLE {product.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Discount code setting */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              VIP Promo Code:
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-900 uppercase focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {/* WhatsApp Dual Broadcast Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Dual Broadcast Payload</span>
              </span>
              <button
                onClick={handleCopyWhatsApp}
                className="text-xs text-[#c5a059] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWhatsApp ? 'Copied Text' : 'Copy Text'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-stone-900 text-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-stone-800">
              {rawMessage}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: WhatsApp Group Broadcast */}
              <a
                href={getWhatsAppGroupUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <Users className="w-4 h-4" />
                <span>Option 1: Open WhatsApp VIP Group</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Option 2: WhatsApp Admin Concierge Broadcast */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Option 2: Broadcast to Concierge</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option 3: Private Member Messaging */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-700 uppercase">Option 3: Send Privately to Individual Members</span>
                <button
                  onClick={() => {
                    const phoneList = subscribers.map(s => s.phone_number).join(', ');
                    navigator.clipboard.writeText(phoneList);
                    alert(`Copied ${subscribers.length} phone numbers for WhatsApp Broadcast List!`);
                  }}
                  className="text-[10px] font-bold text-emerald-700 hover:underline"
                >
                  Copy All Phones for Broadcast List
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Click any member below to send them this personalized announcement directly in private WhatsApp chat:
              </p>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pt-1">
                {subscribers.map((sub) => {
                  const cleanPhone = sub.phone_number.replace(/\D/g, '');
                  const privateMsg = `Hello ${sub.full_name} 👋,\n\n${rawMessage}`;
                  return (
                    <a
                      key={sub.id}
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(privateMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors text-xs"
                    >
                      <span className="font-semibold text-stone-900">{sub.full_name} ({sub.phone_number})</span>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <span>Send Private WA</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>


          {/* Email Broadcast Section (Resend / SendGrid Hook ready) */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#d47a82]" />
                <span>Bulk Email Dispatch (Resend / SendGrid API)</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-xs text-[#c5a059] hover:underline font-semibold flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <p><strong>Subject:</strong> {emailSubject}</p>
              <p className="text-stone-600 whitespace-pre-wrap">{emailBody}</p>
            </div>

            <button
              onClick={handleTriggerEmailDispatch}
              className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                emailDispatched
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {emailDispatched
                  ? `Dispatched successfully to ${subscribers.filter((s) => s.email).length} email inboxes!`
                  : `Trigger Bulk Dispatch to ${subscribers.filter((s) => s.email).length} VIP Emails`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
