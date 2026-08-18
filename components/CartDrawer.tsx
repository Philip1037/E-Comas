'use client';

import React from 'react';
import { useCart } from '@/lib/store';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export default function CartDrawer({ onOpenCheckout }: CartDrawerProps) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    settings,
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = settings.free_delivery_threshold || 400;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#18161b] text-[#f5ebd7] shadow-sm">
                <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">Your Shopping Bag</h3>
                <p className="text-xs text-stone-500">
                  {cart.length === 0
                    ? 'Your bag is empty'
                    : `${cart.reduce((a, c) => a + c.quantity, 0)} item(s) selected`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar with Shimmer */}
          {cart.length > 0 && (
            <div className="bg-[#faf6f0] px-4 sm:px-5 py-3 border-b border-[#ecd09f]/40">
              <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin-slow" />
                  {remainingForFree === 0 ? (
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <span>🎉 Unlocked FREE Freetown Express delivery!</span>
                    </strong>
                  ) : (
                    <span>Add <strong>SLE {remainingForFree.toFixed(2)}</strong> more for FREE delivery</span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-stone-500">{progressToFreeDelivery.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    remainingForFree === 0
                      ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600'
                      : 'bg-gradient-to-r from-[#c5a059] to-amber-500'
                  }`}
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 animate-pulse">
                  <ShoppingBag className="w-10 h-10 text-stone-400" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-800">Your bag is currently empty</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                    Explore our 18K gold jewelry, silk couture gowns, and botanical skincare to add pieces to your bag.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#18161b] hover:bg-[#c5a059] hover:text-black text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Start Shopping &rarr;
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.product.price * item.quantity;
                const img =
                  item.product.images?.[0] ||
                  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80';

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-xs relative group hover:border-[#c5a059]/50 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                      <img
                        src={img}
                        alt={item.product.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1 leading-snug">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#b88d3e] font-semibold">
                          SLE {item.product.price.toFixed(2)} each
                        </span>
                      </div>

                      {/* Quantity and Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-stone-900 px-2 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-950">
                            SLE {lineTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#faf8f5] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">SLE {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Freetown Express Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {remainingForFree === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      'Calculated at WhatsApp Checkout'
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-950">
                  <span>Total Due</span>
                  <span className="text-base text-stone-950">SLE {cartSubtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Instant WhatsApp Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#b88d3e] hover:from-[#fae6be] hover:to-[#dfba73] text-stone-950 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/25 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pay via Orange Money &bull; AfriMoney &bull; Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
