'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store';
import { Heart, Star, Zap, Eye, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, showToast } = useCart();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'];

  const isOutOfStock = product.stock_quantity <= 0;
  const rating = product.rating || 4.9;
  const soldCount = product.sold_count || '500+ sold';
  const discountPercent =
    product.discount_percent ||
    (product.original_price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      showToast('Wishlist Updated', `❤️ Saved "${product.title}" to your Wishlist!`, 'info');
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || images.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* IMAGE CONTAINER */}
      <div
        className="relative aspect-[3/4] bg-stone-100 overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImgIndex]}
          alt={`${product.title} - image ${currentImgIndex + 1}`}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* SWAP ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              aria-label="Previous image"
              title="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              aria-label="Next image"
              title="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* DOT INDICATORS */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-xs">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImgIndex === idx ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* DISCOUNT & FLASH BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20 pointer-events-none">
          {discountPercent && (
            <span
              className="px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-600 to-red-500 text-white text-[10px] sm:text-xs font-black tracking-tight shadow-md animate-pulse"
              style={{ animationDuration: '2.5s' }}
            >
              -{discountPercent}%
            </span>
          )}

          {product.is_flash_sale && (
            <span className="px-2 py-0.5 rounded-md bg-stone-950 text-amber-300 text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-md border border-amber-400/30">
              <Zap
                className="w-2.5 h-2.5 fill-amber-300 text-amber-300 animate-bounce"
                style={{ animationDuration: '2s' }}
              />
              FLASH
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500 flex items-center justify-center shadow-md transition-all z-20 active:scale-75 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-600'
            }`}
          />
        </button>

        {/* QUICK VIEW HOVER PILL */}
        <div className="absolute inset-x-4 bottom-7 hidden sm:flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-900/90 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-white/20 pointer-events-none">
          <Eye className="w-4 h-4 text-[#c5a059]" />
          <span>Quick View</span>
        </div>

        {/* Stock Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-md bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Trends tag if bestseller */}
          {product.is_best_seller && (
            <span className="text-[10px] text-amber-700 font-bold block truncate">
              #1 Bestseller &bull; {product.category_name}
            </span>
          )}

          {/* Title */}
          <h3
            className="text-xs sm:text-sm text-stone-900 font-semibold line-clamp-2 leading-snug group-hover:text-[#c5a059] transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Cart Button Row */}
        <div className="pt-2 flex items-end justify-between gap-1 border-t border-stone-100">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-stone-950">
                SLE {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>

              {discountPercent && (
                <span className="text-[10px] font-bold text-rose-600">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Sold count & Stars */}
            <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-0.5">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-semibold">{rating}</span>
              <span className="text-stone-400">({soldCount})</span>
            </div>
          </div>

          {/* SHOPPING CART BUTTON */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 btn-pop shrink-0 cursor-pointer ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white border-emerald-600 scale-110 shadow-lg'
                : 'bg-stone-900 hover:bg-[#c5a059] text-white border-stone-900 hover:border-[#c5a059] shadow-md hover:shadow-xl hover:scale-105'
            }`}
            title="Add to bag"
          >
            {isAdding ? (
              <Check className="w-4 h-4 animate-in zoom-in" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
