'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Zap, ShoppingBag, Flame } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function HeroBanner({ onOpenVip }: { onOpenVip: () => void }) {
  const { settings } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#121013] text-white">
      {/* Background ambient pulsing gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a059]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d47a82]/25 rounded-full blur-3xl pointer-events-none translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#c5a059]/40 backdrop-blur-md text-xs tracking-widest text-[#f5ebd7] uppercase shimmer-badge shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin-slow" />
              <span>Harmattan &amp; Gala Runway Drop &bull; 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white font-bold">
              Elegance Tailored for the <span className="gold-gradient-text italic font-serif">Modern Woman</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              18K gold jewelry, silk couture gowns, and clinical botanical skincare formulated for radiant melanin glow. Instant Freetown delivery and direct WhatsApp mobile money checkout.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-[#c5a059]/25 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenVip}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#f5ebd7] border border-white/20 backdrop-blur-sm font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>Join VIP Drop Club</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-stone-400">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Truck className="w-4 h-4 text-[#c5a059] shrink-0 animate-bounce" style={{ animationDuration: '3s' }} />
                <span>Freetown Express</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>WhatsApp Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orange / AfriMoney</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[3/4] bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Maison Lumière Couture & Jewelry"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                {/* Floating Card Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#c5a059] font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
                        Featured Batch Drop
                      </span>
                      <h4 className="font-serif text-sm font-semibold truncate text-stone-100 mt-0.5">
                        18K Gold Celestial Jewelry Set
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400">Price</span>
                      <p className="font-bold text-[#f5ebd7] text-sm">SLE 185.00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative small floating card (Serum) */}
              <div className="absolute -top-5 -left-5 hidden sm:block p-3 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-white/20 shadow-2xl max-w-[190px] animate-float">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80"
                    alt="Serum"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-[11px] font-bold text-stone-200 leading-tight">24K Radiance Elixir</p>
                    <p className="text-[10px] text-[#c5a059] font-bold">SLE 280.00</p>
                  </div>
                </div>
              </div>

              {/* VIP Limited Drop pill */}
              <div className="absolute -bottom-3 -right-3 p-2.5 px-4 rounded-2xl bg-[#c5a059] text-stone-950 font-black text-xs shadow-2xl flex items-center gap-1.5 animate-float-slow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Freetown Run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
