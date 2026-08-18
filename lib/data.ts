import { Category, Product, BoutiqueSettings, Subscriber, Order } from './types';

export const DEFAULT_SETTINGS: BoutiqueSettings = {
  brand_name: "MAISON LUMIÈRE",
  tagline: "Jewelry, Luxury Couture & Botanical Cosmetics",
  admin_whatsapp: "23276889900", // International format without +
  whatsapp_group_link: "https://chat.whatsapp.com/LumiereVIPClubDemo",
  orange_money_number: "076 889 900",
  orange_money_merchant_id: "OM-882190",
  orange_money_ussd_template: "*144*3*{MERCHANT_ID}*{AMOUNT}#",
  afrimoney_number: "088 123 456",
  afrimoney_merchant_id: "AF-550192",
  afrimoney_ussd_template: "*161*2*{MERCHANT_ID}*{AMOUNT}#",
  currency_code: "SLE",
  currency_symbol: "SLE",
  delivery_fee: 35,
  free_delivery_threshold: 400,
  contact_email: "concierge@maisonlumiere.sl",
  store_address: "14 Wilberforce Street, Freetown, Sierra Leone",
  demo_mode_enabled: true,
  admin_username: "admin@boutique.sl",
  admin_password: "admin123",
  admin_recovery_email: "philipbangura1037@gmail.com"
};


export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-jewelry",
    name: "Jewelry & Sets",
    slug: "jewelry-accessories",
    description: "18K Gold plated layered necklaces, chunky statement earrings, and zircon rings.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-necklaces",
    name: "Necklaces & Pendants",
    slug: "necklaces",
    description: "Chic layered chains, gemstone pendants, and collar statement pieces.",
    icon: "Crown",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-earrings",
    name: "Earrings & Hoops",
    slug: "earrings",
    description: "Gold textured drop hoops, pearl studs, and geometric runway dangles.",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-rings",
    name: "Rings & Bracelets",
    slug: "rings-bracelets",
    description: "Stacked vintage rings, cuff bracelets, and crystal tennis bands.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-1",
    name: "Dresses & Outfits",
    slug: "dresses-outfits",
    description: "Evening gowns, luxury silk wraps, cocktail dresses, and curated two-piece sets.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-2",
    name: "Cosmetics & Skincare",
    slug: "cosmetics-skincare",
    description: "Hydrating serums, melanin-glow foundations, velvet lip stains, and organic oils.",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-flash",
    name: "Flash Sale Deals",
    slug: "flash-sale",
    description: "Limited-time mega discounts up to 60% OFF.",
    icon: "Flame",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-j1",
    title: "18K Gold Plated Zirconia Celestial Necklace Set",
    description: "A stunning 3-piece layered necklace set featuring a sparkling starburst pendant, delicate herringbone chain, and tarnish-free water-resistant coating.",
    price: 185,
    original_price: 265,
    discount_percent: 30,
    category_id: "cat-jewelry",
    category_name: "Jewelry & Sets",
    rating: 4.9,
    review_count: 248,
    sold_count: "1.5k+ sold",
    is_flash_sale: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 24,
    tags: ["18K Gold", "Layered Necklace", "Water Resistant", "Flash Sale"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-10T10:00:00.000Z"
  },
  {
    id: "prod-j2",
    title: "Vintage Molten Gold Textured Chunky Drop Earrings",
    description: "High-impact runway chunky teardrop earrings crafted with hypoallergenic stainless steel base and rich French gold plating. Extremely lightweight and comfortable for all-day glamour.",
    price: 120,
    original_price: 180,
    discount_percent: 33,
    category_id: "cat-earrings",
    category_name: "Earrings & Hoops",
    rating: 4.8,
    review_count: 189,
    sold_count: "890+ sold",
    is_flash_sale: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 30,
    tags: ["Drop Earrings", "Chunky Gold", "Runway Trend", "Hypoallergenic"],
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-11T11:00:00.000Z"
  },
  {
    id: "prod-j3",
    title: "Emerald Cut Radiant Crystal Cocktail Ring Set (4-Piece)",
    description: "Adjustable luxury stacking rings with simulated emerald centerstone, micro-pave eternity band, and twisted rope accents.",
    price: 145,
    original_price: 210,
    discount_percent: 31,
    category_id: "cat-rings",
    category_name: "Rings & Bracelets",
    rating: 4.9,
    review_count: 312,
    sold_count: "2.1k+ sold",
    is_flash_sale: false,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 18,
    tags: ["Stacking Rings", "Emerald Cut", "Adjustable", "Party Wear"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-12T12:00:00.000Z"
  },
  {
    id: "prod-j4",
    title: "Baroque Freshwater Pearl & Paperclip Chain Choker",
    description: "Hand-selected organic baroque pearls juxtaposed against modern geometric gold paperclip links. An everyday luxury statement.",
    price: 160,
    original_price: 240,
    discount_percent: 33,
    category_id: "cat-necklaces",
    category_name: "Necklaces & Pendants",
    rating: 4.9,
    review_count: 142,
    sold_count: "650+ sold",
    is_flash_sale: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 15,
    tags: ["Baroque Pearl", "Paperclip Chain", "Choker", "Gift Box"],
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-12T14:30:00.000Z"
  },
  {
    id: "prod-1",
    title: "Aura Silk Chiffon Tiered Maxi Runway Gown",
    description: "An ethereal floor-length chiffon dress with hand-pleated sweetheart neckline and flowing romantic tier layers. Perfect for formal dinners, red carpet galas, and VIP celebrations in Sierra Leone.",
    price: 650,
    original_price: 850,
    discount_percent: 24,
    category_id: "cat-1",
    category_name: "Dresses & Outfits",
    rating: 5.0,
    review_count: 96,
    sold_count: "420+ sold",
    is_flash_sale: false,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 8,
    tags: ["Silk Chiffon", "Evening Gown", "Freetown Gala", "Red Carpet"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "prod-2",
    title: "Nocturne Velvet Draped Halter Cocktail Dress",
    description: "Sculpted stretch midnight velvet that hugs the silhouette with architectural precision. Features an asymmetrical side drape slit, gold hardware clasp, and interior boning support.",
    price: 520,
    original_price: 680,
    discount_percent: 24,
    category_id: "cat-1",
    category_name: "Dresses & Outfits",
    rating: 4.8,
    review_count: 78,
    sold_count: "310+ sold",
    is_flash_sale: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    stock_quantity: 5,
    tags: ["Velvet", "Cocktail", "Asymmetrical", "Party Wear"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-02T11:30:00.000Z"
  },
  {
    id: "prod-3",
    title: "24K Radiance Gold Peptide Glow Serum (50ml)",
    description: "Infused with pure 24-karat gold flakes, multi-molecular hyaluronic acid, and botanical collagen. Formulated to give deep, camera-ready luminosity in humid and tropical climates.",
    price: 280,
    original_price: 360,
    discount_percent: 22,
    category_id: "cat-2",
    category_name: "Cosmetics & Skincare",
    rating: 4.9,
    review_count: 184,
    sold_count: "950+ sold",
    is_flash_sale: false,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 18,
    tags: ["24K Gold", "Hyaluronic Acid", "Glass Skin", "Melanin Care"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-03T09:15:00.000Z"
  },
  {
    id: "prod-4",
    title: "Botanical Illuminating Body Nectar Oil (150ml)",
    description: "Cold-pressed Moroccan argan oil, golden jojoba, and rosehip seed extract infused with micro-shimmer pearl particles. Leaves skin soft, hydrated, and glowing with an exotic amber fragrance.",
    price: 195,
    original_price: 275,
    discount_percent: 29,
    category_id: "cat-2",
    category_name: "Cosmetics & Skincare",
    rating: 4.9,
    review_count: 220,
    sold_count: "1.8k+ sold",
    is_flash_sale: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 22,
    tags: ["Body Oil", "Shimmer", "Organic Argan", "Glow Nectar"],
    images: [
      "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-04T14:00:00.000Z"
  },
  {
    id: "prod-5",
    title: "Imperial Champagne Satin Corset & Palazzo Pants Set",
    description: "Tailored structured corset top with boned bodice paired with high-waisted flowing wide-leg palazzo pants. A high-fashion power ensemble.",
    price: 580,
    original_price: 750,
    discount_percent: 23,
    category_id: "cat-1",
    category_name: "Dresses & Outfits",
    rating: 4.8,
    review_count: 64,
    sold_count: "280+ sold",
    is_flash_sale: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    stock_quantity: 6,
    tags: ["Corset Set", "Palazzo Pants", "Champagne Satin", "Two-Piece"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-05T16:45:00.000Z"
  },
  {
    id: "prod-6",
    title: "Velvet Matte Lip Soufflé Trio (Nude, Rose, Ruby)",
    description: "Three weightless whipped liquid lip colors designed to flatter melanin-rich and olive undertones. Transfer-resistant and non-drying.",
    price: 150,
    original_price: 220,
    discount_percent: 32,
    category_id: "cat-2",
    category_name: "Cosmetics & Skincare",
    rating: 4.9,
    review_count: 310,
    sold_count: "2.4k+ sold",
    is_flash_sale: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    stock_quantity: 28,
    tags: ["Lip Trio", "Matte Souffle", "Longwear", "Transfer Proof"],
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    created_at: "2026-08-06T08:30:00.000Z"
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: "sub-1",
    full_name: "Fatmata Koroma",
    phone_number: "+23276112233",
    email: "fatmata.k@gmail.com",
    subscribed_at: "2026-08-01T12:00:00.000Z",
    notes: "VIP Client • Loves Silk Maxi Gowns & Gold Serums"
  },
  {
    id: "sub-2",
    full_name: "Mariama Sesay",
    phone_number: "+23278445566",
    email: "m.sesay@yahoo.com",
    subscribed_at: "2026-08-03T15:20:00.000Z",
    notes: "Regular gala attendee in Freetown"
  },
  {
    id: "sub-3",
    full_name: "Aminata Bangura",
    phone_number: "+23230998877",
    email: "amina.bangura@outlook.com",
    subscribed_at: "2026-08-05T09:10:00.000Z",
    notes: "Interested in bridal entourage pieces"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    reference_code: "ML-78921",
    customer_name: "Fatmata Koroma",
    customer_phone: "076 112 233",
    delivery_address: "24 Wilkinson Road, Freetown",
    city: "Freetown",
    items: [
      {
        product_id: "prod-j1",
        title: "18K Gold Plated Zirconia Celestial Necklace Set",
        price: 185,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
        line_total: 185
      },
      {
        product_id: "prod-4",
        title: "Botanical Illuminating Body Nectar Oil (150ml)",
        price: 195,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=400&q=80",
        line_total: 195
      }
    ],
    total_amount: 380,
    payment_method: "Orange Money",
    status: "confirmed",
    notes: "Customer confirmed OM payment via WhatsApp",
    created_at: "2026-08-14T16:20:00.000Z"
  }
];
