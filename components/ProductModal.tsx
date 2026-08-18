'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store';
import { X, Plus, Minus, ShoppingBag, Sparkles, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenVip: () => void;
}

export default function ProductModal({ product, onClose, onOpenVip }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'];

  const isOutOfStock = product.stock_quantity <= 0;

  const handleIncrement = () => {
    if (quantity < product.stock_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery Column */}
        <div className="md:w-1/2 bg-stone-100 p-6 flex flex-col justify-between">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-stone-200 relative">
            <img
              src={images[selectedImg] || images[0]}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-full object-cover object-center"
            />
            {product.is_new_arrival && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#18161b] text-[#f5ebd7] text-xs font-bold uppercase tracking-wider shadow-md">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImg === idx ? 'border-[#c5a059] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Buying Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#b88d3e]">
                {product.category_name || 'Boutique Collection'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1 leading-tight">
                {product.title}
              </h2>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs text-stone-400 block font-medium">Boutique Price</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  SLE {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block font-medium">Availability</span>
                {isOutOfStock ? (
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                    Out of Stock
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
                    {product.stock_quantity} in Freetown Stock
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Piece Overview</h4>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* VIP Drop Perk callout */}
            <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#ecd09f] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-xs font-medium text-stone-800">
                  VIP Club Members get instant early drop notices & WhatsApp concierge.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenVip();
                }}
                className="text-xs font-bold text-[#b88d3e] hover:underline shrink-0 ml-2"
              >
                Join VIP
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">Quantity</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden shadow-inner">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-2.5 text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-stone-900 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock_quantity}
                    className="p-2.5 text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Add Button */}
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 shadow-[#18161b]/15'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isOutOfStock ? 'Currently Sold Out' : `Add ${quantity} to Bag • SLE ${(product.price * quantity).toFixed(2)}`}
              </span>
            </button>

            {/* Delivery Assurance */}
            <div className="flex items-center justify-center gap-6 text-stone-500 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Express Freetown Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>100% Authentic Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
