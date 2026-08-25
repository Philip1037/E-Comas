'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, ShoppingBag, ArrowRight, Zap, Check, RefreshCw, Heart, Star, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { getStoredProducts } from '@/lib/storage';
import { Product } from '@/lib/types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  products?: Product[];
  actionType?: 'cart_summary' | 'checkout' | 'category_filter';
  categoryId?: string;
  timestamp: Date;
}

export default function AiShoppingAssistant() {
  const { cart, cartSubtotal, addToCart, setIsCartOpen, showToast } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Bonjour! I am **Lumière AI**, your personal luxury shopping assistant. 💎✨\n\nHow may I assist your style today? You can ask me to find products, recommend dresses or 18K gold jewelry, check your bag, or add items directly to your cart!",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add User Message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Process Response after brief realistic delay
    setTimeout(() => {
      const response = processUserQuery(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const processUserQuery = (query: string): Message => {
    const q = query.toLowerCase();
    const allProducts = getStoredProducts().filter((p) => p.is_active);

    // 1. Cart Inquiry or Checkout
    if (q.includes('cart') || q.includes('bag') || q.includes('basket') || q.includes('checkout') || q.includes('total')) {
      if (cart.length === 0) {
        return {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: "Your shopping bag is currently empty! 🛍️\n\nWould you like me to recommend our **#1 Bestselling 18K Gold Jewelry** or **Couture Gala Gowns**?",
          timestamp: new Date(),
        };
      }

      const cartItemsSummary = cart
        .map((item) => `• **${item.product.title}** (x${item.quantity}) - SLE ${(item.product.price * item.quantity).toFixed(2)}`)
        .join('\n');

      return {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: `Here is what's in your shopping bag (${cart.length} item${cart.length > 1 ? 's' : ''}):\n\n${cartItemsSummary}\n\n**Total Amount**: SLE ${cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n\nDelivery to Freetown is available with free delivery over SLE 400!`,
        actionType: 'cart_summary',
        timestamp: new Date(),
      };
    }

    // 2. Delivery / Payment FAQs
    if (q.includes('deliver') || q.includes('freetown') || q.includes('ship') || q.includes('payment') || q.includes('orange') || q.includes('afri') || q.includes('whatsapp')) {
      return {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: "🚚 **Delivery & Payment Info**:\n\n• **Express Freetown Delivery**: Delivered same-day or next-day right to your door.\n• **Free Delivery**: Free shipping on orders over **SLE 400**.\n• **Payment Methods**: Cash on Delivery, **Orange Money**, and **AfriMoney**.\n• **WhatsApp Checkout**: Instant order confirmation via WhatsApp!",
        timestamp: new Date(),
      };
    }

    // 3. Category Search matching
    let matchedProducts: Product[] = [];
    let responseIntro = '';

    if (q.includes('dress') || q.includes('gown') || q.includes('outfit') || q.includes('abaya') || q.includes('kaftan') || q.includes('silk')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-1');
      responseIntro = "Here are our exclusive **Dresses & Outfits** collection for galas, red carpet events, and celebrations:";
    } else if (q.includes('jewelry') || q.includes('gold') || q.includes('18k') || q.includes('zircon') || q.includes('set')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-jewelry');
      responseIntro = "Here are our finest **18K Gold Plated Jewelry & Sets**:";
    } else if (q.includes('perfume') || q.includes('fragrance') || q.includes('oud') || q.includes('spray') || q.includes('attar') || q.includes('scent')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-perfumes');
      responseIntro = "Discover our luxurious **Perfumes & Royale Oud Fragrances**:";
    } else if (q.includes('skincare') || q.includes('cosmetic') || q.includes('serum') || q.includes('foundation') || q.includes('glow') || q.includes('lipid') || q.includes('face')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-2');
      responseIntro = "Here are our high-performance **Cosmetics & Botanical Skincare** pieces for radiant glow:";
    } else if (q.includes('necklace') || q.includes('chain') || q.includes('pendant') || q.includes('choker')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-necklaces');
      responseIntro = "Explore our **Necklaces & Pendants** collection:";
    } else if (q.includes('earring') || q.includes('hoop') || q.includes('stud')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-earrings');
      responseIntro = "Here are our **Earrings & Hoops** statement pieces:";
    } else if (q.includes('ring') || q.includes('bracelet') || q.includes('cuff') || q.includes('watch')) {
      matchedProducts = allProducts.filter((p) => p.category_id === 'cat-rings' || p.category_id === 'cat-jewelry');
      responseIntro = "Here are our **Rings, Bracelets & Timepieces**:";
    } else if (q.includes('flash') || q.includes('sale') || q.includes('deal') || q.includes('discount') || q.includes('cheap')) {
      matchedProducts = allProducts.filter((p) => p.is_flash_sale);
      responseIntro = "⚡ Here are today's **Flash Sale Deals** with massive discounts:";
    } else if (q.includes('bestseller') || q.includes('best seller') || q.includes('popular') || q.includes('top')) {
      matchedProducts = allProducts.filter((p) => p.is_best_seller);
      responseIntro = "🔥 Here are our **#1 Top Selling Pieces** loved by customers in Freetown:";
    } else if (q.includes('new') || q.includes('arrival') || q.includes('latest')) {
      matchedProducts = allProducts.filter((p) => p.is_new_arrival);
      responseIntro = "✨ Here are the **Latest New Arrivals** fresh from the runway:";
    } else {
      // Keyword fallback match
      matchedProducts = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
      if (matchedProducts.length > 0) {
        responseIntro = `I found **${matchedProducts.length}** item${matchedProducts.length > 1 ? 's' : ''} matching your search:`;
      }
    }

    if (matchedProducts.length > 0) {
      return {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseIntro,
        products: matchedProducts.slice(0, 4), // Limit to top 4 cards inside message for clean scrolling
        timestamp: new Date(),
      };
    }

    // Default intelligent fallback
    return {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      text: `I couldn't find exact matches for "${query}". Try asking for **"Dresses"**, **"18K Gold Jewelry"**, **"Perfumes"**, **"Skincare"**, or click one of the quick prompts below! ✨`,
      products: allProducts.filter((p) => p.is_best_seller).slice(0, 3),
      timestamp: new Date(),
    };
  };

  const handleAddProductFromChat = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    showToast('Bag Updated', `Added "${product.title}" to your cart! 🛍️`, 'info');
    setTimeout(() => setAddedProductId(null), 1200);
  };

  return (
    <>
      {/* FLOATING AI ASSISTANT TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-[#18161b] via-[#2d2833] to-[#18161b] text-white border border-[#c5a059]/60 shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer pulse-ring-gold group"
        aria-label="Open Lumière AI Shopping Assistant"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#fae6be] text-stone-950 font-bold shadow-md">
          <Bot className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] leading-none">Lumière AI</p>
          <p className="text-xs font-semibold text-stone-100">Shopping Assistant</p>
        </div>
        <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin-slow" />
      </button>

      {/* CHAT DRAWER / MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full sm:max-w-md h-[88vh] sm:h-[620px] bg-[#121013] text-stone-100 border border-[#c5a059]/30 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* CHAT HEADER */}
            <div className="p-4 bg-[#18161b] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#c5a059] to-[#dfba73] text-stone-950 flex items-center justify-center font-bold shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
                    Lumière AI Concierge
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  </h3>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Personal Shopping Assistant &bull; Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MESSAGES BODY */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#c5a059] text-stone-950 font-medium rounded-br-none shadow-md'
                        : 'bg-[#1e1b21] text-stone-200 border border-white/10 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* CART SUMMARY BUTTON TRIGGER */}
                    {msg.actionType === 'cart_summary' && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsCartOpen(true);
                        }}
                        className="mt-3 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfba73] text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Open Bag &amp; Checkout Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* EMBEDDED RECOMMENDED PRODUCT CARDS */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-3 grid grid-cols-1 gap-2.5 pl-2">
                      {msg.products.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-2.5 rounded-2xl bg-[#1a171d] border border-stone-800 hover:border-[#c5a059]/50 transition-all flex items-center gap-3 shadow-md"
                        >
                          <img
                            src={prod.images[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80'}
                            alt={prod.title}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-900 border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{prod.title}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-[#c5a059]">
                                SLE {prod.price.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                {prod.rating || 4.9}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleAddProductFromChat(prod, e)}
                            className={`p-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                              addedProductId === prod.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-bold'
                            }`}
                            title="Add to bag"
                          >
                            {addedProductId === prod.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingBag className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-stone-500 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-stone-400 text-xs pl-2">
                  <Bot className="w-3.5 h-3.5 text-[#c5a059] animate-spin-slow" />
                  <span>Lumière AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTED PROMPTS */}
            <div className="px-4 py-2 bg-[#18161b] border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => handleQuickPrompt('Show me 18K Gold Jewelry')}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-medium border border-white/10 shrink-0 cursor-pointer"
              >
                💎 18K Gold Jewelry
              </button>
              <button
                onClick={() => handleQuickPrompt('Show me Evening Dresses')}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-medium border border-white/10 shrink-0 cursor-pointer"
              >
                👗 Evening Dresses
              </button>
              <button
                onClick={() => handleQuickPrompt('Show me Skincare & Glow Serums')}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-medium border border-white/10 shrink-0 cursor-pointer"
              >
                🧴 Skincare &amp; Glow
              </button>
              <button
                onClick={() => handleQuickPrompt('Show me Perfumes')}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-medium border border-white/10 shrink-0 cursor-pointer"
              >
                🌸 Perfumes
              </button>
              <button
                onClick={() => handleQuickPrompt('What is in my cart?')}
                className="px-3 py-1 rounded-full bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#c5a059] text-xs font-medium border border-[#c5a059]/30 shrink-0 cursor-pointer"
              >
                🛍️ View My Cart
              </button>
            </div>

            {/* INPUT FOOTER */}
            <div className="p-3 bg-[#18161b] border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Lumière AI (e.g. 'Show me gold necklaces')..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-white/15 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:brightness-110 text-stone-950 font-bold transition-all disabled:opacity-40 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
