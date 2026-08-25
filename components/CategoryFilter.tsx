'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Heart, Flame, Crown, Grid, Zap, ArrowUpDown, SlidersHorizontal, Check } from 'lucide-react';
import { getStoredCategories } from '@/lib/storage';
import { Category } from '@/lib/types';

export type SortOption = 'recommend' | 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'flash_sale';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalProductsCount: number;
}

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalProductsCount,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedCats = getStoredCategories();
    setCategories(storedCats);
  }, []);

  return (
    <div id="catalog" className="pt-5 pb-3 space-y-5">
      {/* 1. SHEIN-STYLE CIRCULAR STORY CATEGORY BUBBLES WITH ANIMATED GLOW RINGS */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#c5a059] animate-spin-slow" />
            <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 tracking-tight">
              Curated Departments
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
            Tap to filter collections
          </span>
        </div>

        {/* Scrollable Story Avatars */}
        <div className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto px-3.5 sm:px-4 py-3 -mx-3.5 sm:-mx-4 scrollbar-none scroll-smooth">
          {/* ALL CATEGORIES BUBBLE */}
          <button
            onClick={() => onSelectCategory('all')}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-tr from-[#c5a059] via-rose-500 to-[#18161b] scale-110 shadow-lg ring-2 ring-[#c5a059]/50'
                  : 'bg-stone-200 group-hover:bg-[#c5a059] group-hover:scale-105'
              }`}
            >
              <div className="w-full h-full rounded-full bg-[#18161b] text-white flex items-center justify-center border-2 border-white shadow-inner">
                <Grid className={`w-5 h-5 sm:w-6 sm:h-6 ${activeCategory === 'all' ? 'text-[#c5a059]' : 'text-stone-300'}`} />
              </div>
            </div>
            <span
              className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors text-center ${
                activeCategory === 'all' ? 'text-stone-950 font-bold' : 'text-stone-600 group-hover:text-stone-900'
              }`}
            >
              All Items
            </span>
          </button>

          {/* DYNAMIC CATEGORY BUBBLES */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const fallbackImg =
              cat.image ||
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80';

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-all duration-300 relative ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#c5a059] via-rose-500 to-[#ff3f34] scale-110 shadow-lg ring-2 ring-[#c5a059]/60'
                      : 'bg-stone-200 group-hover:bg-stone-400 group-hover:scale-105'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-stone-100 shadow-inner relative">
                    <img
                      src={fallbackImg}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                    />
                    {cat.id === 'cat-flash' && (
                      <span className="absolute inset-0 bg-rose-600/35 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white fill-white animate-pulse" />
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[11px] sm:text-xs tracking-tight transition-colors max-w-[72px] sm:max-w-[85px] text-center line-clamp-1 ${
                    isActive ? 'text-stone-950 font-bold' : 'text-stone-600 group-hover:text-stone-900 font-medium'
                  }`}
                  title={cat.name}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SHEIN SEARCH & SORTING TOOLBAR WITH SMOOTH HOVERS */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-3 space-y-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Real-time Search Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search items by keyword..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] text-stone-400 hover:text-stone-600 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Total Count */}
          <div className="text-[11px] text-stone-500 font-medium self-start sm:self-center">
            Found <strong className="text-stone-900 font-bold">{totalProductsCount}</strong> luxury pieces
          </div>
        </div>

        {/* 3. SHEIN SORTING TABS WITH ACTIVE TRANSITIONS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1 border-t border-stone-100 scrollbar-none">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Sort:
          </span>

          <button
            onClick={() => onSortChange('recommend')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              sortBy === 'recommend'
                ? 'bg-[#18161b] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Recommended
          </button>

          <button
            onClick={() => onSortChange('popular')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              sortBy === 'popular'
                ? 'bg-[#18161b] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            🔥 Most Popular
          </button>

          <button
            onClick={() => onSortChange('newest')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              sortBy === 'newest'
                ? 'bg-[#18161b] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ✨ New In
          </button>

          <button
            onClick={() => onSortChange(sortBy === 'price_asc' ? 'price_desc' : 'price_asc')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1 cursor-pointer ${
              sortBy === 'price_asc' || sortBy === 'price_desc'
                ? 'bg-[#18161b] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <ArrowUpDown className="w-3 h-3 text-[#c5a059]" />
            <span>
              {sortBy === 'price_asc' ? 'Price: Low ➔ High' : sortBy === 'price_desc' ? 'Price: High ➔ Low' : 'Price'}
            </span>
          </button>

          <button
            onClick={() => onSortChange('flash_sale')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1 cursor-pointer ${
              sortBy === 'flash_sale'
                ? 'bg-gradient-to-r from-rose-600 to-[#ff3f34] text-white shadow-sm'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            <Zap className="w-3 h-3 fill-current animate-pulse" />
            <span>Flash Deals</span>
          </button>
        </div>
      </div>
    </div>
  );
}
