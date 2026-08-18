'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/store';
import { PaymentMethod } from '@/lib/types';
import { generateWhatsAppCheckoutUrl, compileWhatsAppMessage } from '@/lib/whatsapp';
import { createOrderRecord } from '@/lib/storage';
import { X, ShieldCheck, Phone, ArrowRight, MapPin, User, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (details: {
    referenceCode: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    whatsAppUrl: string;
  }) => void;
}

export default function CheckoutModal({ isOpen, onClose, onOrderCompleted }: CheckoutModalProps) {
  const { cart, cartSubtotal, settings, clearCart, showToast } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Freetown');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Orange Money');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isFreeDelivery = cartSubtotal >= (settings.free_delivery_threshold || 400);
  const deliveryFee = isFreeDelivery ? 0 : (settings.delivery_fee || 35);
  const grandTotal = cartSubtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      showToast('Missing Fields', 'Please complete your name, phone number, and delivery address.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Generate Order Record
      const orderItems = cart.map((item) => ({
        product_id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0],
        line_total: item.product.price * item.quantity,
      }));

      const newOrder = createOrderRecord({
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: `${deliveryAddress}, ${city}`,
        city: city,
        items: orderItems,
        total_amount: grandTotal,
        payment_method: paymentMethod,
        status: 'pending',
        notes: notes,
      });

      // 2. Generate WhatsApp Checkout URL
      const whatsAppUrl = generateWhatsAppCheckoutUrl(
        settings.admin_whatsapp,
        {
          customerName,
          customerPhone,
          deliveryAddress: `${deliveryAddress}, ${city}`,
          paymentMethod,
          notes,
          referenceCode: newOrder.reference_code,
        },
        cart,
        grandTotal,
        settings
      );

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a059', '#d47a82', '#ffffff'],
        });
      } catch (err) {
        // ignore if confetti fails
      }

      // Clear cart
      clearCart();

      // Notify parent to open payment instructions
      onOrderCompleted({
        referenceCode: newOrder.reference_code,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod,
        whatsAppUrl: whatsAppUrl,
      });

      onClose();
    } catch (error) {
      console.error('Checkout error:', error);
      showToast('Order Error', 'There was a problem preparing your order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f5ebd7]">
                Complete Your Boutique Order
              </h3>
              <p className="text-xs text-stone-400">
                Direct WhatsApp & Mobile Money Dispatch &bull; SLE Currency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#ecd09f]/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-500 block">Items in Bag: {cart.reduce((a, c) => a + c.quantity, 0)}</span>
              <span className="font-bold text-stone-900 text-sm">
                Grand Total: SLE {grandTotal.toFixed(2)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-stone-500 block">Delivery</span>
              <span className="font-semibold text-emerald-700">
                {isFreeDelivery ? 'FREE (Unlocked)' : `SLE ${deliveryFee.toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <User className="w-4 h-4 text-[#c5a059]" />
              <span>Customer &amp; Contact Info</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Fatmata Sesay"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp / Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +232 76 123 456"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c5a059]" />
              <span>Delivery Address &bull; Sierra Leone</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street Address &amp; Landmarks <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. 24 Wilkinson Road, near Total Station"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City / Region
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                >
                  <option value="Freetown (Central / West)">Freetown (West/Central)</option>
                  <option value="Freetown (East / Hill)">Freetown (East/Hill Station)</option>
                  <option value="Bo">Bo City</option>
                  <option value="Kenema">Kenema</option>
                  <option value="Makeni">Makeni</option>
                  <option value="Other Provinces">Other Provincial Delivery</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Preference */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Select Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Orange Money */}
              <label
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'Orange Money'
                    ? 'border-[#ff7900] bg-orange-50/60 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Orange Money"
                  checked={paymentMethod === 'Orange Money'}
                  onChange={() => setPaymentMethod('Orange Money')}
                  className="sr-only"
                />
                <span className="w-8 h-8 rounded-full bg-[#ff7900] text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm">
                  OM
                </span>
                <span className="text-xs font-bold text-stone-900">Orange Money</span>
                <span className="text-[10px] text-stone-500">Merchant / USSD #144#</span>
              </label>

              {/* AfriMoney */}
              <label
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'AfriMoney'
                    ? 'border-[#e20613] bg-rose-50/60 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="AfriMoney"
                  checked={paymentMethod === 'AfriMoney'}
                  onChange={() => setPaymentMethod('AfriMoney')}
                  className="sr-only"
                />
                <span className="w-8 h-8 rounded-full bg-[#e20613] text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm">
                  AF
                </span>
                <span className="text-xs font-bold text-stone-900">AfriMoney</span>
                <span className="text-[10px] text-stone-500">Africell *161# Till</span>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#18161b] bg-stone-100 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="sr-only"
                />
                <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm">
                  COD
                </span>
                <span className="text-xs font-bold text-stone-900">Cash on Delivery</span>
                <span className="text-[10px] text-stone-500">Pay Courier on Arrival</span>
              </label>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Order Notes / Sizing Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Size UK 12 preferred, please deliver after 2 PM"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-600/20 active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Phone className="w-4 h-4" />
              <span>Generate WhatsApp Direct Order &bull; SLE {grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2">
              Opens WhatsApp with your pre-formatted order summary &amp; displays Mobile Money instructions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
