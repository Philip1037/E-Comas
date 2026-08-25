'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { getStoredCategories, setAdminAuthenticated } from '@/lib/storage';
import { Category } from '@/lib/types';
import {
  ShoppingBag,
  Sparkles,
  Phone,
  ShieldCheck,
  Menu,
  X,
  Heart,
  Search,
  Camera,
  ChevronRight,
  Zap,
  Tag,
  Grid,
  Gift,
  HelpCircle,
} from 'lucide-react';

interface NavbarProps {
  onOpenVip?: () => void;
  onSearchSubmit?: (query: string) => void;
  onCategorySelect?: (categoryId: string) => void;
}

export default function Navbar({ onOpenVip, onSearchSubmit, onCategorySelect }: NavbarProps) {
  const { cartCount, setIsCartOpen, settings } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [navSearch, setNavSearch] = useState('');

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onSearchSubmit) {
        onSearchSubmit(navSearch);
      }
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchClick = () => {
    if (onSearchSubmit) {
      onSearchSubmit(navSearch);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDrawerCategory = (catId: string) => {
    setIsDrawerOpen(false);
    if (onCategorySelect) {
      onCategorySelect(catId);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Navbar: 100% Solid Opaque White Header (Zero Bleed-through) */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            {/* Left: HAMBURGER MENU BUTTON ☰ (Visible on both Desktop & Mobile like SHEIN) & Brand Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* SHEIN-Style ☰ Hamburger Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-lg text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none cursor-pointer flex items-center justify-center border border-stone-200 shadow-xs"
                title="Open Category Menu"
                aria-label="Toggle Category Drawer"
              >
                <Menu className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Brand Logo */}
              <Link href="/" className="group flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.16em] text-stone-900 group-hover:text-[#c5a059] transition-colors whitespace-nowrap">
                  {settings.brand_name || 'MAISON LUMIÈRE'}
                </span>
                <span className="hidden sm:block text-[8px] sm:text-[9px] tracking-[0.3em] text-stone-500 uppercase font-semibold">
                  Jewelry &bull; Couture &bull; Cosmetics
                </span>
              </Link>
            </div>

            {/* Center: SHEIN-STYLE SEARCH BAR (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => {
                    setNavSearch(e.target.value);
                    if (onSearchSubmit) onSearchSubmit(e.target.value);
                  }}
                  onKeyDown={handleSearchKey}
                  placeholder="Bracelets, Gold Necklaces, Gowns, Serums..."
                  className="w-full pl-4 pr-20 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
                />
                <div className="absolute right-1 flex items-center gap-1">
                  <span className="p-1.5 text-stone-400 hover:text-stone-600 cursor-pointer">
                    <Camera className="w-4 h-4" />
                  </span>
                  <button
                    onClick={handleSearchClick}
                    className="p-1.5 px-3 rounded-md bg-[#18161b] hover:bg-[#c5a059] text-white transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Actions (Wishlist, WhatsApp, Admin, Shopping Bag) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* WhatsApp Concierge */}
              <a
                href={`https://wa.me/${settings.admin_whatsapp}?text=${encodeURIComponent(
                  'Hello Maison Lumière! I would like to make an inquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-all duration-200 btn-pop hover:scale-105"
                title="WhatsApp Direct"
              >
                <Phone className="w-3 h-3 text-emerald-600 animate-pulse" />
                <span>WhatsApp</span>
              </a>

              {/* VIP Club Link */}
              <button
                onClick={onOpenVip}
                className="hidden lg:flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-all duration-200 cursor-pointer btn-pop hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin-slow" />
                <span>VIP Club</span>
              </button>

              {/* Admin Portal Link */}
              <Link
                href="/admin/login"
                onClick={() => setAdminAuthenticated(false)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-90"
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059]" />
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-[#18161b] text-white hover:bg-[#c5a059] hover:text-stone-950 transition-all duration-300 shadow-md active:scale-90 hover:scale-110 cursor-pointer ml-1 btn-pop"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-rose-600 to-[#ff3f34] text-white text-[10px] font-black min-w-[18px] text-center shadow-lg animate-bounce">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (SHEIN Mobile App Style) */}
          <div className="mt-2 md:hidden relative">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => {
                  setNavSearch(e.target.value);
                  if (onSearchSubmit) onSearchSubmit(e.target.value);
                }}
                onKeyDown={handleSearchKey}
                placeholder="Search bracelets, gold necklaces, dresses..."
                className="w-full pl-3.5 pr-16 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
              <div className="absolute right-1 flex items-center gap-1">
                <span className="p-1 text-stone-400">
                  <Camera className="w-3.5 h-3.5" />
                </span>
                <button
                  onClick={handleSearchClick}
                  className="p-1 px-2.5 rounded-md bg-[#18161b] text-white"
                  aria-label="Search"
                >
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SHEIN-STYLE SLIDE-OUT CATEGORY & NAVIGATION DRAWER (Opened via ☰ Hamburger) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-[#18161b] text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Menu className="w-5 h-5 text-[#c5a059]" />
                <div>
                  <h3 className="font-serif font-bold text-base tracking-wider text-[#f5ebd7]">
                    {settings.brand_name || 'MAISON LUMIÈRE'}
                  </h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Categories &amp; Departments
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Promo Banner inside drawer */}
            <div className="p-3 bg-gradient-to-r from-rose-600 to-[#ff3f34] text-white text-xs font-bold flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-white" />
                <span>FLASH SALE • UP TO 60% OFF</span>
              </div>
              <button
                onClick={() => handleSelectDrawerCategory('cat-flash')}
                className="px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 text-[10px] uppercase font-black"
              >
                Shop Now
              </button>
            </div>

            {/* Scrollable Category List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 px-1">
                  Shop by Department
                </span>

                <div className="space-y-1">
                  {/* All Collection */}
                  <button
                    onClick={() => handleSelectDrawerCategory('all')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 text-stone-900 text-xs font-bold transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#18161b] text-white flex items-center justify-center">
                        <Grid className="w-4 h-4 text-[#c5a059]" />
                      </div>
                      <span>All Collections</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Dynamic Categories */}
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectDrawerCategory(cat.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 text-stone-900 text-xs font-semibold transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                          <img
                            src={
                              cat.image ||
                              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80'
                            }
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Features & Services */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-1">
                  Customer Services
                </span>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenVip && onOpenVip();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    <span>VIP Member Drop Club</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase">
                    Join
                  </span>
                </button>

                <a
                  href={`https://wa.me/${settings.admin_whatsapp}?text=${encodeURIComponent(
                    'Hello Maison Lumière Concierge! I have an order inquiry.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Concierge</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Instant Reply</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>Currency: <strong>SLE (Leone)</strong></span>
              <Link
                href="/admin/login"
                onClick={() => {
                  setAdminAuthenticated(false);
                  setIsDrawerOpen(false);
                }}
                className="font-bold text-stone-900 hover:text-[#c5a059] flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </Link>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
