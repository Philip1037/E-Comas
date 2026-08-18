'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Clock, Tag, Sparkles, Check, ChevronRight, Gift, Flame } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function FlashSaleBanner() {
  const { showToast } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 45,
  });

  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimVoucher = (code: string, discountText: string) => {
    setClaimedCode(code);
    navigator.clipboard?.writeText(code);
    showToast('🎉 Voucher Copied!', `Code '${code}' copied (${discountText}).`, 'success');
  };

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full bg-gradient-to-r from-[#18161b] via-[#2a1c24] to-[#18161b] text-white border-y border-[#c5a059]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5">
          {/* Left: Flash Sale & Live Countdown Timer with Fire Pulse */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 via-[#ff3f34] to-rose-600 text-white text-[11px] font-black tracking-wider uppercase shadow-md animate-pulse">
              <Zap className="w-3.5 h-3.5 fill-white animate-bounce" style={{ animationDuration: '1.5s' }} />
              <span>FLASH SALE • UP TO 60% OFF</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-stone-300">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="hidden sm:inline font-medium text-[11px]">Ends in:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-xs">
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[#f5ebd7] border border-[#c5a059]/40 shadow-inner">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-[#c5a059] font-bold animate-pulse">:</span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[#f5ebd7] border border-[#c5a059]/40 shadow-inner">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-[#c5a059] font-bold animate-pulse">:</span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-rose-400 border border-rose-500/40 shadow-inner font-black">
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: 1-Tap Voucher Claim Chips with Interactive Hover */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-0.5 lg:pb-0 scrollbar-none">
            {/* Voucher 1 */}
            <button
              onClick={() => handleClaimVoucher('SHEIN10', '10% OFF Everything')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border btn-pop hover:scale-105 ${
                claimedCode === 'SHEIN10'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-[#f5ebd7] border-[#c5a059]/40 hover:border-[#c5a059]'
              }`}
            >
              <Tag className="w-3 h-3 text-[#c5a059]" />
              <span>10% OFF</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-[#c5a059] font-mono font-black">
                SHEIN10
              </span>
              {claimedCode === 'SHEIN10' && <Check className="w-3 h-3 text-white animate-in zoom-in" />}
            </button>

            {/* Voucher 2 */}
            <button
              onClick={() => handleClaimVoucher('FREESHIP', 'Free Express Delivery in Freetown')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border btn-pop hover:scale-105 ${
                claimedCode === 'FREESHIP'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-[#f5ebd7] border-[#c5a059]/40 hover:border-[#c5a059]'
              }`}
            >
              <Gift className="w-3 h-3 text-[#c5a059]" />
              <span>FREE SHIPPING</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-[#c5a059] font-mono font-black">
                FREESHIP
              </span>
              {claimedCode === 'FREESHIP' && <Check className="w-3 h-3 text-white animate-in zoom-in" />}
            </button>

            {/* Orange / AfriMoney badge */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-stone-400 pl-2">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" style={{ animationDuration: '2s' }} />
              <span>Pay via Orange / AfriMoney in SLE</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
