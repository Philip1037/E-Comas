'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenVip }: { onOpenVip?: () => void }) {
  const { settings } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0c0f] text-stone-300 border-t border-stone-800 text-sm">
      {/* Top Value Banner */}
      <div className="border-b border-stone-800/80 py-8 bg-[#141216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-white text-base">Freetown Fast Delivery</h4>
              <p className="text-xs text-stone-400">Same-day and next-day express delivery across Western Area.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-white text-base">Mobile Money Secure</h4>
              <p className="text-xs text-stone-400">Seamless payment with Orange Money, AfriMoney &amp; Cash on Delivery.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-white text-base">Runway Authenticity</h4>
              <p className="text-xs text-stone-400">100% verified luxury silks, tailored couture, and organic botanicals.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-white text-base">WhatsApp Concierge</h4>
              <p className="text-xs text-stone-400">Instant sizing advice and personalized styling recommendations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                {settings.brand_name || 'MAISON LUMIÈRE'}
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-[#c5a059] uppercase -mt-0.5">
                Boutique Couture &bull; Sierra Leone
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              Elevating women's fashion in Sierra Leone with curated runway silhouettes, evening silks, and clinical-grade organic cosmetics designed for glowing radiance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Freetown Flagship Showroom</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#c5a059]">Collections</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#dresses" className="hover:text-white transition-colors">Evening &amp; Gala Gowns</a>
              </li>
              <li>
                <a href="#skincare" className="hover:text-white transition-colors">24K Radiance Cosmetics</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">New Batch Drops</a>
              </li>
              <li>
                <button onClick={onOpenVip} className="hover:text-[#c5a059] transition-colors text-left flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  <span>VIP Members Access</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#c5a059]">Concierge &amp; Showroom</h5>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{settings.store_address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.admin_whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  +{settings.admin_whatsapp} (WhatsApp Direct)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d47a82] shrink-0" />
                <span>{settings.contact_email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} {settings.brand_name}. All rights reserved &bull; Freetown, Sierra Leone.
          </p>

          <p className="text-center text-xs text-stone-400 font-medium tracking-wide">
            Built by{' '}
            <a
              href="https://philipsamuelbangura.link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] font-bold hover:underline transition-colors inline-flex items-center gap-1"
            >
              Engr. Philip Samuel Bangura
            </a>
          </p>


          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-stone-300 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
