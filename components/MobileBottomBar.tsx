'use client';

import React from 'react';
import { Home, Grid, Zap, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store';

interface MobileBottomBarProps {
  onOpenCart: () => void;
  onFilterFlashSale: () => void;
  onScrollToCatalog: () => void;
  activeCategory: string;
}

export default function MobileBottomBar({
  onOpenCart,
  onFilterFlashSale,
  onScrollToCatalog,
  activeCategory,
}: MobileBottomBarProps) {
  const { cartCount } = useCart();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-2xl py-2 px-3">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={handleScrollTop}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#c5a059] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={onScrollToCatalog}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#c5a059] transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Categories</span>
        </button>

        {/* Flash Deals with glowing badge */}
        <button
          onClick={onFilterFlashSale}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeCategory === 'cat-flash' ? 'text-rose-600 font-extrabold' : 'text-stone-700 hover:text-rose-500'
          }`}
        >
          <div className="relative">
            <Zap className={`w-5 h-5 ${activeCategory === 'cat-flash' ? 'fill-rose-600 text-rose-600' : 'text-rose-500'}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span className="text-[10px] font-bold">Flash Deals</span>
        </button>

        {/* Cart Button with animated badge */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 text-stone-900 hover:text-[#c5a059] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-rose-600 to-[#ff3f34] text-white font-black text-[9px] min-w-[16px] text-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Bag</span>
        </button>
      </div>
    </div>
  );
}
