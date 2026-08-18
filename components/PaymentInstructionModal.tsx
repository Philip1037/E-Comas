'use client';

import React, { useState } from 'react';
import { BoutiqueSettings, PaymentMethod } from '@/lib/types';
import { compileUSSDCode } from '@/lib/whatsapp';
import { X, Check, Copy, Phone, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface PaymentInstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceCode: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  settings: BoutiqueSettings;
  whatsAppUrl: string;
}

export default function PaymentInstructionModal({
  isOpen,
  onClose,
  referenceCode,
  totalAmount,
  paymentMethod,
  settings,
  whatsAppUrl,
}: PaymentInstructionModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedUSSD, setCopiedUSSD] = useState(false);

  if (!isOpen) return null;

  const isOrange = paymentMethod === 'Orange Money';
  const isAfriMoney = paymentMethod === 'AfriMoney';
  const isCOD = paymentMethod === 'Cash on Delivery';

  const ussdCode = compileUSSDCode(paymentMethod, totalAmount, settings);

  const merchantNumber = isOrange
    ? settings.orange_money_number
    : isAfriMoney
    ? settings.afrimoney_number
    : '';

  const merchantId = isOrange
    ? settings.orange_money_merchant_id
    : isAfriMoney
    ? settings.afrimoney_merchant_id
    : '';


  const handleCopyCode = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyNumber = () => {
    if (merchantNumber) {
      navigator.clipboard.writeText(merchantNumber.replace(/\s/g, ''));
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-[#faf6f0] border border-[#ecd09f]">
            <ShieldCheck className="w-8 h-8 text-[#c5a059]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Order Reference Generated
          </h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Your boutique order has been recorded. Please complete payment or finalize details on WhatsApp.
          </p>
        </div>

        {/* Reference Box */}
        <div className="p-4 rounded-2xl bg-[#18161b] text-white flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
              Order Reference Code
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#c5a059] tracking-wider">
              {referenceCode}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#f5ebd7] transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Payment Specific Instructions */}
        {!isCOD && (
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                {paymentMethod} Payment Details
              </span>
              <span className="text-xs font-bold text-stone-900">
                Amount: SLE {totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] text-stone-400 block font-medium">Merchant / Cashout No:</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-stone-900">{merchantNumber}</span>
                  <button
                    onClick={handleCopyNumber}
                    className="text-stone-400 hover:text-stone-700 p-0.5"
                    title="Copy number"
                  >
                    {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] text-stone-400 block font-medium">Merchant ID / Till:</span>
                <span className="font-bold text-stone-900 block mt-0.5">{merchantId}</span>
              </div>
            </div>

            {/* Dynamic USSD String Box */}
            {ussdCode && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Direct USSD Mobile Dial Code</span>
                  <span className="font-mono text-sm font-bold text-amber-950">{ussdCode}</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(ussdCode);
                    setCopiedUSSD(true);
                    setTimeout(() => setCopiedUSSD(false), 2500);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors"
                >
                  {copiedUSSD ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUSSD ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            )}

            {/* USSD Steps */}
            <div className="text-[11px] text-stone-600 space-y-1.5 pt-2 border-t border-stone-200/80">
              <p className="font-semibold text-stone-800">Transfer Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-stone-600">
                {isOrange ? (
                  <>
                    <li>Dial <strong>{ussdCode || '#144#'}</strong> or enter merchant code <strong>{merchantId}</strong></li>
                    <li>Enter Amount: <strong>SLE {totalAmount.toFixed(2)}</strong> &amp; Ref: <strong>{referenceCode}</strong></li>
                    <li>Send receipt screenshot or confirmation code via WhatsApp to dispatch team</li>
                  </>
                ) : (
                  <>
                    <li>Dial <strong>{ussdCode || '*161#'}</strong> or enter Till code <strong>{merchantId}</strong></li>
                    <li>Enter Amount: <strong>SLE {totalAmount.toFixed(2)}</strong> &amp; Ref: <strong>{referenceCode}</strong></li>
                    <li>Send receipt screenshot or confirmation code via WhatsApp to dispatch team</li>
                  </>
                )}
              </ol>
            </div>
          </div>

        )}

        {isCOD && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Cash on Delivery Selected</p>
              <p className="mt-0.5 text-amber-800">
                Please prepare exact cash of <strong>SLE {totalAmount.toFixed(2)}</strong> upon dispatch courier arrival in Freetown.
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp Final Trigger */}
        <div className="space-y-2.5">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-98"
          >
            <Phone className="w-4 h-4" />
            <span>Open WhatsApp to Confirm Order</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors text-center"
          >
            I've saved my reference code, close
          </button>
        </div>
      </div>
    </div>
  );
}
