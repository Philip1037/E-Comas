'use client';

import React, { useState } from 'react';
import { addSubscriber } from '@/lib/storage';
import { useCart } from '@/lib/store';
import { getWhatsAppGroupUrl } from '@/lib/whatsapp';
import { sendWelcomeVipEmail } from '@/lib/email';
import { Sparkles, Phone, Mail, User, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

import confetti from 'canvas-confetti';

export default function VipSubscribeSection() {
  const { settings, showToast } = useCart();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      showToast('Required Information', 'Please provide your Full Name and WhatsApp Number.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const result = addSubscriber({
        full_name: fullName.trim(),
        phone_number: phoneNumber.trim(),
        email: email.trim() || undefined,
        notes: 'Joined via Storefront VIP Section',
      });

      if (result.success) {
        setIsSubmitted(true);
        showToast('VIP Activated!', 'You are now enrolled in the Maison Lumière VIP Drop Club.', 'success');

        if (email.trim()) {
          sendWelcomeVipEmail(email.trim(), fullName.trim(), settings.brand_name).catch(err => {
            console.error('Welcome email dispatch error:', err);
          });
        }

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.7 },
            colors: ['#c5a059', '#d47a82', '#ffd700'],
          });
        } catch (err) {
          // ignore
        }
      } else {
        showToast('Already Registered', result.message, 'info');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      showToast('Error', 'Unable to register subscription. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="vip-club" className="py-16 sm:py-24 bg-[#121013] text-white relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#c5a059]/20 via-[#d47a82]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-xs font-bold uppercase tracking-widest text-[#f5ebd7]">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Priority Access List</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Join the <span className="gold-gradient-text italic font-serif">Maison VIP Club</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                Be the first in Sierra Leone to receive direct WhatsApp broadcasts when exclusive runway batches, limited silk chiffon dresses, and fresh 24K botanical serums arrive.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                  <span>30-minute early access before general release</span>
                </div>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                  <span>Exclusive 10% VIP coupon codes on batch releases</span>
                </div>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                  <span>Direct concierge reservation over WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6">
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-white/10 border border-white/20 text-center space-y-5 backdrop-blur-md animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Welcome to the VIP Club!
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    You have successfully joined the VIP Drop list. Join our official WhatsApp VIP Group below to interact with our community and receive instant drop alerts!
                  </p>

                  <a
                    href={getWhatsAppGroupUrl(settings)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-600/30"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Join Official WhatsApp VIP Group</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhoneNumber('');
                      setEmail('');
                    }}
                    className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer block mx-auto pt-2"
                  >
                    Register another number &rarr;
                  </button>
                </div>
              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 rounded-2xl bg-[#18161b]/90 border border-white/15 space-y-4 shadow-xl"
                >
                  <h3 className="font-serif text-lg font-bold text-[#f5ebd7] text-center">
                    Reserve Your VIP Drop Pass
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aminata Kamara"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+232 76 000 000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aminata@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] hover:from-[#ecd09f] hover:to-[#dfba73] text-stone-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-[#c5a059]/25 transition-all duration-300 active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{loading ? 'Registering VIP...' : 'Get VIP Drop Notifications'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No spam. Only high-priority batch release alerts.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
