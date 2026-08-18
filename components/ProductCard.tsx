'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store';
import { Heart, Star, Zap, Eye, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, showToast } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'];

  const isOutOfStock = product.stock_quantity <= 0;
  const rating = product.rating || 4.9;
  const reviewCount = product.review_count || 128;
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

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-[#c5a059]/70 product-card-hover flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* IMAGE CONTAINER WITH SMOOTH HOVER ZOOM */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <img
          src={images[currentImgIndex]}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover object-center image-zoom group-hover:scale-106"
        />

        {/* SHEIN-STYLE DISCOUNT BADGE WITH PULSE (Top Left) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discountPercent && (
            <span className="px-1.5 py-0.5 rounded bg-[#ff3f34] text-white text-[10px] sm:text-xs font-black tracking-tight shadow-md animate-pulse" style={{ animationDuration: '2.5s' }}>
              -{discountPercent}%
            </span>
          )}

          {product.is_flash_sale && (
            <span className="px-1.5 py-0.5 rounded bg-black text-amber-300 text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-md">
              <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300 animate-bounce" style={{ animationDuration: '2s' }} />
              FLASH
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON (Top Right with Heart Pop) */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500 flex items-center justify-center shadow-md transition-all z-10 active:scale-75 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-600'
            }`}
          />
        </button>

        {/* QUICK VIEW HOVER PILL */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/95 text-stone-900 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0">
          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Quick View</span>
        </div>

        {/* Stock Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="px-2.5 py-1 rounded bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider shadow">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Trends tag if bestseller */}
          {product.is_best_seller && (
            <span className="text-[10px] text-amber-700 font-bold block truncate">
              #1 Bestseller &bull; {product.category_name}
            </span>
          )}

          {/* Title */}
          <h3
            className="text-xs sm:text-sm text-stone-800 line-clamp-2 leading-snug group-hover:text-[#c5a059] transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Cart Button Row */}
        <div className="pt-1 flex items-end justify-between gap-1 border-t border-stone-100">
          <div>
            {/* Price line with crossed price and discount */}
            <div className="flex items-baseline gap-1 flex-wrap">
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
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>{rating}</span>
              <span className="text-stone-400">({soldCount})</span>
            </div>
          </div>

          {/* SHEIN-STYLE SHOPPING CART BUTTON WITH POP & CHECKMARK ANIMATION */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-all duration-200 btn-pop shrink-0 cursor-pointer ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white border-emerald-600 scale-110 shadow-md'
                : 'bg-stone-50 hover:bg-[#18161b] text-stone-800 hover:text-white border-stone-300 hover:border-black shadow-xs hover:shadow-md hover:scale-105'
            }`}
            title="Add to bag"
          >
            {isAdding ? (
              <Check className="w-3.5 h-3.5 animate-in zoom-in" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
