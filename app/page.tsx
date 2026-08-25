'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FlashSaleBanner from '@/components/FlashSaleBanner';
import HeroBanner from '@/components/HeroBanner';
import CategoryFilter, { SortOption } from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import PaymentInstructionModal from '@/components/PaymentInstructionModal';
import VipSubscribeSection from '@/components/VipSubscribeSection';
import MobileBottomBar from '@/components/MobileBottomBar';
import Footer from '@/components/Footer';
import { getStoredProducts, setAdminAuthenticated, initializeDatabaseSync } from '@/lib/storage';

import { Product, PaymentMethod } from '@/lib/types';
import { Sparkles, Zap, Flame, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function StorefrontPage() {
  const { settings, setIsCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recommend');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    referenceCode: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    whatsAppUrl: string;
  }>({
    isOpen: false,
    referenceCode: '',
    totalAmount: 0,
    paymentMethod: 'Cash on Delivery',
    whatsAppUrl: '',
  });

  useEffect(() => {
    setAdminAuthenticated(false);
    setProducts(getStoredProducts());
    initializeDatabaseSync().then(() => {
      setProducts(getStoredProducts());
    });
  }, []);

  const handleOpenVip = () => {
    const el = document.getElementById('vip-club');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterFlashSale = () => {
    setActiveCategory('cat-flash');
    handleScrollToCatalog();
  };

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    if (!p.is_active) return false;

    // Search query matching
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.category_name && p.category_name.toLowerCase().includes(query)) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

    // Category matching
    let matchesCategory = true;
    if (activeCategory !== 'all') {
      if (activeCategory === 'cat-flash') {
        matchesCategory = !!p.is_flash_sale;
      } else if (activeCategory === 'cat-3') {
        matchesCategory = p.is_new_arrival || p.category_id === 'cat-3';
      } else if (activeCategory === 'cat-4') {
        matchesCategory = !!p.is_best_seller || p.category_id === 'cat-4';
      } else {
        matchesCategory = p.category_id === activeCategory;
      }
    }

    return matchesSearch && matchesCategory;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.review_count || 0) - (a.review_count || 0);
    }
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    if (sortBy === 'flash_sale') {
      return (b.is_flash_sale ? 1 : 0) - (a.is_flash_sale ? 1 : 0);
    }
    return 0; // default recommend
  });

  const handleOrderCompleted = (data: {
    referenceCode: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    whatsAppUrl: string;
  }) => {
    setPaymentModalData({
      isOpen: true,
      referenceCode: data.referenceCode,
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      whatsAppUrl: data.whatsAppUrl,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 pb-16 md:pb-0 overflow-x-hidden">
      {/* 1. Header & Navigation with ☰ Drawer & Search */}
      <Navbar
        onOpenVip={handleOpenVip}
        onSearchSubmit={(q) => setSearchQuery(q)}
        onCategorySelect={(catId) => setActiveCategory(catId)}
      />

      {/* 2. SHEIN Flash Sale & Voucher Banner */}
      <FlashSaleBanner />

      {/* 3. Hero Runway & Gala Drop Banner */}
      <HeroBanner onOpenVip={handleOpenVip} />

      {/* 4. Main Catalog Section with SHEIN Circular Story Bubbles & 2-Column Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 flex-1 w-full">
        {/* SHEIN Circular Category Stories & Sorting Toolbar */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          sortBy={sortBy}
          onSortChange={(sort) => setSortBy(sort)}
          totalProductsCount={sortedProducts.length}
        />

        {/* PRODUCT GRID */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pt-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-[#c5a059] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              No matching pieces found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or explore all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2 rounded-full bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* VIP DROP SUBSCRIBER BANNER */}
        <div id="vip-club" className="mt-16">
          <VipSubscribeSection />
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Mobile Floating App Bar (SHEIN Signature) */}
      <MobileBottomBar
        onOpenCart={() => setIsCartOpen(true)}
        onFilterFlashSale={handleFilterFlashSale}
        onScrollToCatalog={handleScrollToCatalog}
        activeCategory={activeCategory}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenVip={handleOpenVip}
      />

      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={handleOrderCompleted}
      />

      <PaymentInstructionModal
        isOpen={paymentModalData.isOpen}
        onClose={() =>
          setPaymentModalData((prev) => ({ ...prev, isOpen: false }))
        }
        referenceCode={paymentModalData.referenceCode}
        totalAmount={paymentModalData.totalAmount}
        paymentMethod={paymentModalData.paymentMethod}
        settings={settings}
        whatsAppUrl={paymentModalData.whatsAppUrl}
      />
    </div>
  );
}
