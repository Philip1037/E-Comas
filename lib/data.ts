import { Category, Product, BoutiqueSettings, Subscriber, Order } from './types';

export const DEFAULT_SETTINGS: BoutiqueSettings = {
  "brand_name": "MAISON LUMIÈRE",
  "tagline": "Jewelry, Luxury Couture, Cosmetics & Perfumes",
  "admin_whatsapp": "23276889900",
  "whatsapp_group_link": "https://chat.whatsapp.com/LumiereVIPClubDemo",
  "orange_money_number": "076 889 900",
  "orange_money_merchant_id": "OM-882190",
  "orange_money_ussd_template": "*144*3*{MERCHANT_ID}*{AMOUNT}#",
  "afrimoney_number": "088 123 456",
  "afrimoney_merchant_id": "AF-550192",
  "afrimoney_ussd_template": "*161*2*{MERCHANT_ID}*{AMOUNT}#",
  "currency_code": "SLE",
  "currency_symbol": "SLE",
  "delivery_fee": 35,
  "free_delivery_threshold": 400,
  "contact_email": "concierge@maisonlumiere.sl",
  "store_address": "14 Wilberforce Street, Freetown, Sierra Leone",
  "demo_mode_enabled": true,
  "admin_username": "philipsamuel",
  "admin_password": "admin123",
  "admin_recovery_email": "philipbangura1037@gmail.com"
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-1",
    "name": "Dresses & Outfits",
    "slug": "dresses-outfits",
    "description": "Evening gowns, luxury silk wraps, cocktail dresses, and curated two-piece sets.",
    "icon": "Sparkles",
    "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-jewelry",
    "name": "Jewelry & Sets",
    "slug": "jewelry-accessories",
    "description": "18K Gold plated layered necklaces, chunky statement earrings, and zircon rings.",
    "icon": "Sparkles",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-perfumes",
    "name": "Perfumes & Fragrances",
    "slug": "perfumes-fragrances",
    "description": "Exotic Royale Oud Elixirs, French Floral Eau de Parfum, and Amber Body Sprays.",
    "icon": "Sparkles",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-2",
    "name": "Cosmetics & Skincare",
    "slug": "cosmetics-skincare",
    "description": "Hydrating serums, melanin-glow foundations, velvet lip stains, and organic oils.",
    "icon": "Heart",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-necklaces",
    "name": "Necklaces & Pendants",
    "slug": "necklaces",
    "description": "Chic layered chains, gemstone pendants, and collar statement pieces.",
    "icon": "Crown",
    "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-earrings",
    "name": "Earrings & Hoops",
    "slug": "earrings",
    "description": "Gold textured drop hoops, pearl studs, and geometric runway dangles.",
    "icon": "Heart",
    "image": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-rings",
    "name": "Rings & Bracelets",
    "slug": "rings-bracelets",
    "description": "Stacked vintage rings, cuff bracelets, and crystal tennis bands.",
    "icon": "Sparkles",
    "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "cat-flash",
    "name": "Flash Sale Deals",
    "slug": "flash-sale",
    "description": "Limited-time mega discounts up to 60% OFF.",
    "icon": "Flame",
    "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-f1",
    "title": "Royal Emerald Satin Wrapped Goddess Slit Maxi Gown",
    "description": "Floor-sweeping lustrous emerald green satin gown featuring a waist wrap belt, dramatic split thigh, and cowl neckline. Designed for galas, red carpet events, and luxury celebrations in Freetown.",
    "price": 720,
    "original_price": 950,
    "discount_percent": 24,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 5,
    "review_count": 112,
    "sold_count": "540+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 10,
    "tags": [
      "Emerald Satin",
      "Goddess Gown",
      "Freetown Gala",
      "Red Carpet"
    ],
    "images": [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e3884?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T11:00:00.000Z"
  },
  {
    "id": "prod-f2",
    "title": "Hand-Embroidered Gold Zari Chiffon Luxe Abaya Kaftan",
    "description": "Opulent chiffon kaftan abaya lined with silk, adorned with intricate gold zari crystal embellishments along the sleeves and collar line. Includes matching silk headwrap.",
    "price": 640,
    "original_price": 820,
    "discount_percent": 22,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 4.9,
    "review_count": 87,
    "sold_count": "390+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 8,
    "tags": [
      "Gold Abaya",
      "Kaftan Couture",
      "Embroidery",
      "Luxury Silk"
    ],
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T15:20:00.000Z"
  },
  {
    "id": "prod-f3",
    "title": "Parisian Blush Pink Feather Accent Cocktail Mini Dress",
    "description": "Tailored blush pink crepe mini cocktail dress trimmed with plush faux ostrich feathers along the neckline and hem. Fun, flirty, and high-fashion statement piece.",
    "price": 490,
    "original_price": 650,
    "discount_percent": 25,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 4.8,
    "review_count": 64,
    "sold_count": "290+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 6,
    "tags": [
      "Feather Trim",
      "Cocktail Mini",
      "Blush Pink",
      "Party Wear",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T18:00:00.000Z"
  },
  {
    "id": "prod-f4",
    "title": "Midnight Sapphire Sequined Mermaid Gala Gown",
    "description": "Spectacular ocean sapphire sequined gown sculpted with a hourglass mermaid silhouette, boned sweetheart corset bodice, and dramatic floor train.",
    "price": 780,
    "original_price": 1050,
    "discount_percent": 26,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 5,
    "review_count": 140,
    "sold_count": "480+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 5,
    "tags": [
      "Sequins",
      "Mermaid Gown",
      "Sapphire Blue",
      "Gala Couture"
    ],
    "images": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e3884?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T12:00:00.000Z"
  },
  {
    "id": "prod-f5",
    "title": "Golden Silk Wrap Kimono & Wide-Leg Lounge Set",
    "description": "High-grade liquid silk two-piece lounge outfit featuring a belt-tied kimono top and high-waisted palazzo pants with golden geometric motifs.",
    "price": 560,
    "original_price": 720,
    "discount_percent": 22,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 4.9,
    "review_count": 95,
    "sold_count": "360+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 9,
    "tags": [
      "Silk Kimono",
      "Two Piece Set",
      "Gold Luxe",
      "Resort Wear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "prod-1",
    "title": "Aura Silk Chiffon Tiered Maxi Runway Gown",
    "description": "An ethereal floor-length chiffon dress with hand-pleated sweetheart neckline and flowing romantic tier layers. Perfect for formal dinners, red carpet galas, and VIP celebrations in Sierra Leone.",
    "price": 650,
    "original_price": 850,
    "discount_percent": 24,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 5,
    "review_count": 96,
    "sold_count": "420+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 8,
    "tags": [
      "Silk Chiffon",
      "Evening Gown",
      "Freetown Gala",
      "Red Carpet"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-01T10:00:00.000Z"
  },
  {
    "id": "prod-2",
    "title": "Nocturne Velvet Draped Halter Cocktail Dress",
    "description": "Sculpted stretch midnight velvet that hugs the silhouette with architectural precision. Features an asymmetrical side drape slit, gold hardware clasp, and interior boning support.",
    "price": 520,
    "original_price": 680,
    "discount_percent": 24,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 4.8,
    "review_count": 78,
    "sold_count": "310+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 5,
    "tags": [
      "Velvet",
      "Cocktail",
      "Asymmetrical",
      "Party Wear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-02T11:30:00.000Z"
  },
  {
    "id": "prod-5",
    "title": "Imperial Champagne Satin Corset & Palazzo Pants Set",
    "description": "Tailored structured corset top with boned bodice paired with high-waisted flowing wide-leg palazzo pants. A high-fashion power ensemble.",
    "price": 580,
    "original_price": 750,
    "discount_percent": 23,
    "category_id": "cat-1",
    "category_name": "Dresses & Outfits",
    "rating": 4.8,
    "review_count": 64,
    "sold_count": "280+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 6,
    "tags": [
      "Corset Set",
      "Palazzo Pants",
      "Champagne Satin",
      "Two-Piece"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-05T16:45:00.000Z"
  },
  {
    "id": "prod-j1",
    "title": "18K Gold Plated Zirconia Celestial Necklace Set",
    "description": "A stunning 3-piece layered necklace set featuring a sparkling starburst pendant, delicate herringbone chain, and tarnish-free water-resistant coating.",
    "price": 185,
    "original_price": 265,
    "discount_percent": 30,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 4.9,
    "review_count": 248,
    "sold_count": "1.5k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 24,
    "tags": [
      "18K Gold",
      "Layered Necklace",
      "Water Resistant",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-10T10:00:00.000Z"
  },
  {
    "id": "prod-j6",
    "title": "Royal Sapphire Blue Crystal Choker & Earring Gala Set",
    "description": "Statement bridal and gala jewelry set boasting deep ocean blue sapphire crystals framed by pavé cubic zirconia. Includes adjustable choker and matching drop earrings.",
    "price": 260,
    "original_price": 380,
    "discount_percent": 31,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 5,
    "review_count": 143,
    "sold_count": "720+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 14,
    "tags": [
      "Sapphire Set",
      "Bridal Jewelry",
      "Statement Choker",
      "VIP Luxury"
    ],
    "images": [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T14:10:00.000Z"
  },
  {
    "id": "prod-j7",
    "title": "Roman Numeral Diamond Mesh Gold Luxury Ladies Watch",
    "description": "Water-resistant quartz ladies timepiece featuring a sunray champagne dial, crystal hour markers, and breathable stainless steel gold mesh strap.",
    "price": 390,
    "original_price": 520,
    "discount_percent": 25,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 4.9,
    "review_count": 210,
    "sold_count": "1.4k+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Luxury Watch",
      "Gold Mesh",
      "Sunray Dial",
      "Water Resistant"
    ],
    "images": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T16:00:00.000Z"
  },
  {
    "id": "prod-j8",
    "title": "Empress Emerald & Diamond Layered Gala Jewelry Set",
    "description": "4-piece royal jewelry suite featuring emerald cut simulated gem drops, solitaire drop earrings, crystal bangle, and matching ring.",
    "price": 380,
    "original_price": 540,
    "discount_percent": 30,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 5,
    "review_count": 175,
    "sold_count": "810+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 12,
    "tags": [
      "Emerald Suite",
      "4-Piece Set",
      "Gala Jewelry",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T11:00:00.000Z"
  },
  {
    "id": "prod-j9",
    "title": "18K Gold Plated Chunky Bamboo Hoop & Choker Set",
    "description": "Vintage 90s inspired 18K gold plated bamboo textured collar choker necklace paired with lightweight matching bamboo hoop earrings.",
    "price": 220,
    "original_price": 310,
    "discount_percent": 29,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 4.8,
    "review_count": 130,
    "sold_count": "640+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 16,
    "tags": [
      "Bamboo Gold",
      "Vintage Set",
      "Chunky Hoops",
      "Runway Trend"
    ],
    "images": [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T13:30:00.000Z"
  },
  {
    "id": "prod-j10",
    "title": "Vintage Baroque Pearl & Crystal Bridal Jewelry Set",
    "description": "Handcrafted organic baroque freshwater pearls linked with marquise diamond accents. Designed for modern brides and VIP guests.",
    "price": 310,
    "original_price": 430,
    "discount_percent": 28,
    "category_id": "cat-jewelry",
    "category_name": "Jewelry & Sets",
    "rating": 4.9,
    "review_count": 98,
    "sold_count": "430+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 15,
    "tags": [
      "Baroque Pearl",
      "Bridal Set",
      "Freshwater Pearls",
      "Handmade"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-18T15:00:00.000Z"
  },
  {
    "id": "prod-p1",
    "title": "Maison Lumière Royal Amber & Golden Oud Eau de Parfum (100ml)",
    "description": "A regal fragrance combining rare Cambodian golden oud, warm Baltic amber, French vanilla blossom, and subtle smoky musk. Crafted for long-lasting 24-hour luxury fragrance presence.",
    "price": 420,
    "original_price": 560,
    "discount_percent": 25,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 5,
    "review_count": 184,
    "sold_count": "980+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 20,
    "tags": [
      "Royal Oud",
      "Eau de Parfum",
      "French Amber",
      "Long Lasting",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T09:00:00.000Z"
  },
  {
    "id": "prod-p2",
    "title": "Velvet Vanilla Blossom & Jasmine Cashmere Fragrance Mist (100ml)",
    "description": "An intoxicating blend of whipped Madagascar vanilla bean, night-blooming jasmine petals, and soft cashmere wood. Light, romantic, and irresistibly sweet.",
    "price": 290,
    "original_price": 390,
    "discount_percent": 26,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 4.9,
    "review_count": 142,
    "sold_count": "620+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 25,
    "tags": [
      "Vanilla Blossom",
      "Jasmine Cashmere",
      "Body Mist",
      "Best Seller"
    ],
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T10:30:00.000Z"
  },
  {
    "id": "prod-p3",
    "title": "Exotic Saffron & Moroccan Rose Luxury Attar Oil (30ml)",
    "description": "Pure concentrated perfume oil infused with organic Moroccan damask rose petals, Spanish saffron, and sandalwood. Alcohol-free formula gentle on skin.",
    "price": 350,
    "original_price": 450,
    "discount_percent": 22,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 4.9,
    "review_count": 98,
    "sold_count": "410+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 16,
    "tags": [
      "Pure Attar Oil",
      "Moroccan Rose",
      "Alcohol Free",
      "Exotic Fragrance"
    ],
    "images": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T14:15:00.000Z"
  },
  {
    "id": "prod-p4",
    "title": "Imperial Rose & Midnight Musk Eau de Parfum (100ml)",
    "description": "Deep velvety red roses blended with earthy cedarwood, bergamot citrus, and sensual black musk. Packaged in a glass crystal flacon.",
    "price": 450,
    "original_price": 590,
    "discount_percent": 24,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 5,
    "review_count": 110,
    "sold_count": "530+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Imperial Rose",
      "Midnight Musk",
      "Eau de Parfum",
      "Luxury Flacon"
    ],
    "images": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-18T09:00:00.000Z"
  },
  {
    "id": "prod-p5",
    "title": "Golden Sandalwood & Sweet Amber Body Spray (150ml)",
    "description": "Warm tropical fragrance mist with notes of sun-warmed sandalwood, toasted coconut nectar, and golden amber.",
    "price": 240,
    "original_price": 320,
    "discount_percent": 25,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 4.8,
    "review_count": 165,
    "sold_count": "890+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 28,
    "tags": [
      "Sandalwood",
      "Sweet Amber",
      "Body Spray",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-18T14:30:00.000Z"
  },
  {
    "id": "prod-p6",
    "title": "French Iris & Pure White Musk Hair Perfume Oil (50ml)",
    "description": "Nutritive hair oil infused with argan oil, French iris, and white musk. Protects hair strands while delivering subtle fragrance with every breeze.",
    "price": 310,
    "original_price": 410,
    "discount_percent": 24,
    "category_id": "cat-perfumes",
    "category_name": "Perfumes & Fragrances",
    "rating": 4.9,
    "review_count": 85,
    "sold_count": "380+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 14,
    "tags": [
      "Hair Perfume",
      "White Musk",
      "Argan Nourish",
      "French Iris"
    ],
    "images": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-19T08:15:00.000Z"
  },
  {
    "id": "prod-c1",
    "title": "Lumière Satin Finish Melanin Radiance Liquid Foundation (50ml)",
    "description": "Sweat-resistant, weightless medium-to-full coverage liquid foundation crafted to perfectly match rich warm and golden melanin skin tones without oxidizing.",
    "price": 220,
    "original_price": 300,
    "discount_percent": 27,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 340,
    "sold_count": "2.8k+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 35,
    "tags": [
      "Melanin Match",
      "Satin Finish",
      "Sweat Proof",
      "Liquid Foundation"
    ],
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-13T09:00:00.000Z"
  },
  {
    "id": "prod-c2",
    "title": "Golden Hour 18-Shimmer Eyeshadow & Face Sculpting Palette",
    "description": "High-pigment ultra-blendable powders including bronzes, metallic copper golds, deep warm terracottas, and blinding champagnes.",
    "price": 190,
    "original_price": 270,
    "discount_percent": 30,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.8,
    "review_count": 195,
    "sold_count": "1.2k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 28,
    "tags": [
      "Eyeshadow Palette",
      "High Pigment",
      "Golden Hour",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T15:30:00.000Z"
  },
  {
    "id": "prod-c3",
    "title": "Rosewater & Niacinamide Hydrating Glow Facial Mist (120ml)",
    "description": "Refreshing botanical face spray infused with organic Bulgarian rosewater, 5% niacinamide, and aloe leaf extract to lock in makeup and hydrate skin instantly.",
    "price": 135,
    "original_price": 185,
    "discount_percent": 27,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 160,
    "sold_count": "1.1k+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 30,
    "tags": [
      "Facial Mist",
      "Niacinamide",
      "Organic Rosewater",
      "Dewy Skin"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T11:45:00.000Z"
  },
  {
    "id": "prod-c4",
    "title": "Vitamin C & Turmeric Dark Spot Brightening Facial Serum (30ml)",
    "description": "Clinical grade 15% L-Ascorbic Acid serum blended with organic turmeric and ferulic acid to fade hyperpigmentation and reveal radiant skin.",
    "price": 210,
    "original_price": 290,
    "discount_percent": 27,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 225,
    "sold_count": "1.6k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 20,
    "tags": [
      "Vitamin C",
      "Brightening",
      "Dark Spot Remover",
      "Glow Serum"
    ],
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T14:00:00.000Z"
  },
  {
    "id": "prod-c5",
    "title": "Honey & Raw Shea Lip Butter & Sugar Exfoliating Scrub Duo",
    "description": "2-step lip care kit containing a brown sugar lip Polish scrub and a rich honey shea balm that restores cracked dry lips.",
    "price": 110,
    "original_price": 160,
    "discount_percent": 31,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.8,
    "review_count": 140,
    "sold_count": "930+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 40,
    "tags": [
      "Lip Care Kit",
      "Shea Butter",
      "Lip Scrub",
      "Plump Lips"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T16:20:00.000Z"
  },
  {
    "id": "prod-3",
    "title": "24K Radiance Gold Peptide Glow Serum (50ml)",
    "description": "Infused with pure 24-karat gold flakes, multi-molecular hyaluronic acid, and botanical collagen. Formulated to give deep, camera-ready luminosity in humid and tropical climates.",
    "price": 280,
    "original_price": 360,
    "discount_percent": 22,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 184,
    "sold_count": "950+ sold",
    "is_flash_sale": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "24K Gold",
      "Hyaluronic Acid",
      "Glass Skin",
      "Melanin Care"
    ],
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-03T09:15:00.000Z"
  },
  {
    "id": "prod-4",
    "title": "Botanical Illuminating Body Nectar Oil (150ml)",
    "description": "Cold-pressed Moroccan argan oil, golden jojoba, and rosehip seed extract infused with micro-shimmer pearl particles. Leaves skin soft, hydrated, and glowing with an exotic amber fragrance.",
    "price": 195,
    "original_price": 275,
    "discount_percent": 29,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 220,
    "sold_count": "1.8k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 22,
    "tags": [
      "Body Oil",
      "Shimmer",
      "Organic Argan",
      "Glow Nectar"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-04T14:00:00.000Z"
  },
  {
    "id": "prod-6",
    "title": "Velvet Matte Lip Soufflé Trio (Nude, Rose, Ruby)",
    "description": "Three weightless whipped liquid lip colors designed to flatter melanin-rich and olive undertones. Transfer-resistant and non-drying.",
    "price": 150,
    "original_price": 220,
    "discount_percent": 32,
    "category_id": "cat-2",
    "category_name": "Cosmetics & Skincare",
    "rating": 4.9,
    "review_count": 310,
    "sold_count": "2.4k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 28,
    "tags": [
      "Lip Trio",
      "Matte Souffle",
      "Longwear",
      "Transfer Proof"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-06T08:30:00.000Z"
  },
  {
    "id": "prod-j4",
    "title": "Baroque Freshwater Pearl & Paperclip Chain Choker",
    "description": "Hand-selected organic baroque pearls juxtaposed against modern geometric gold paperclip links. An everyday luxury statement.",
    "price": 160,
    "original_price": 240,
    "discount_percent": 33,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 4.9,
    "review_count": 142,
    "sold_count": "650+ sold",
    "is_flash_sale": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 15,
    "tags": [
      "Baroque Pearl",
      "Paperclip Chain",
      "Choker",
      "Gift Box"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-12T14:30:00.000Z"
  },
  {
    "id": "prod-n1",
    "title": "18K Solid Gold Zodiac Constellation Coin Pendant Necklace",
    "description": "Double-sided embossed gold coin pendant featuring cubic zirconia star constellations. Tarnish-free 18K gold chain.",
    "price": 175,
    "original_price": 250,
    "discount_percent": 30,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 4.9,
    "review_count": 180,
    "sold_count": "920+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 20,
    "tags": [
      "Zodiac Coin",
      "18K Gold",
      "Pendant Necklace",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-13T10:00:00.000Z"
  },
  {
    "id": "prod-n2",
    "title": "Emerald Cut Crystal Solitaire Collar Choker Necklace",
    "description": "Scintillating 5-carat simulated emerald solitaire stone suspended on a delicate micro-pave gold collar chain.",
    "price": 195,
    "original_price": 280,
    "discount_percent": 30,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 5,
    "review_count": 120,
    "sold_count": "580+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 14,
    "tags": [
      "Emerald Cut",
      "Solitaire Choker",
      "Gold Necklace",
      "Statement"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T12:00:00.000Z"
  },
  {
    "id": "prod-n3",
    "title": "Layered Flat Snake Chain & Crystal Heart Locket",
    "description": "2-in-1 layered gold set combining a silky liquid herringbone snake chain with a pave crystal heart locket.",
    "price": 165,
    "original_price": 230,
    "discount_percent": 28,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 4.8,
    "review_count": 95,
    "sold_count": "410+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Snake Chain",
      "Heart Locket",
      "Layered Gold",
      "Gift Idea"
    ],
    "images": [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T14:00:00.000Z"
  },
  {
    "id": "prod-n4",
    "title": "Vintage Egyptian Scarab Turquoise Gemstone Pendant",
    "description": "Intricately carved natural turquoise scarab beetle gemstone framed in textured antique French gold filigree.",
    "price": 210,
    "original_price": 300,
    "discount_percent": 30,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 4.9,
    "review_count": 75,
    "sold_count": "320+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 12,
    "tags": [
      "Turquoise",
      "Egyptian Scarab",
      "Vintage Pendant",
      "Gold Filigree"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T16:00:00.000Z"
  },
  {
    "id": "prod-n5",
    "title": "Multi-Strand Seed Pearl & Gold Bead Statement Collar",
    "description": "Five woven strands of lustrous micro seed pearls interspaced with 18K gold beads and custom box lock.",
    "price": 230,
    "original_price": 320,
    "discount_percent": 28,
    "category_id": "cat-necklaces",
    "category_name": "Necklaces & Pendants",
    "rating": 4.9,
    "review_count": 110,
    "sold_count": "490+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 15,
    "tags": [
      "Multi-Strand",
      "Seed Pearl",
      "Gold Collar",
      "Statement Piece"
    ],
    "images": [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T11:00:00.000Z"
  },
  {
    "id": "prod-j2",
    "title": "Vintage Molten Gold Textured Chunky Drop Earrings",
    "description": "High-impact runway chunky teardrop earrings crafted with hypoallergenic stainless steel base and rich French gold plating. Extremely lightweight and comfortable for all-day glamour.",
    "price": 120,
    "original_price": 180,
    "discount_percent": 33,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 4.8,
    "review_count": 189,
    "sold_count": "890+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 30,
    "tags": [
      "Drop Earrings",
      "Chunky Gold",
      "Runway Trend",
      "Hypoallergenic"
    ],
    "images": [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-11T11:00:00.000Z"
  },
  {
    "id": "prod-e1",
    "title": "18K Gold Plated Twisted Ribbon Statement Hoops",
    "description": "Modern architectural twisted ribbon gold hoops with secure latch backs. High shine polished finish, tarnish resistant.",
    "price": 130,
    "original_price": 190,
    "discount_percent": 31,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 4.9,
    "review_count": 155,
    "sold_count": "780+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 25,
    "tags": [
      "Gold Hoops",
      "Twisted Ribbon",
      "Statement Earrings",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-13T09:00:00.000Z"
  },
  {
    "id": "prod-e2",
    "title": "Crystal Pave Chandelier Drop Evening Earrings",
    "description": "Glamorous multi-tier chandelier drop earrings encrusted with hundreds of sparkling cubic zirconia crystals. Perfect for galas.",
    "price": 160,
    "original_price": 230,
    "discount_percent": 30,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 5,
    "review_count": 110,
    "sold_count": "510+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Chandelier Earrings",
      "Pave Crystal",
      "Evening Glam",
      "Gala"
    ],
    "images": [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T11:00:00.000Z"
  },
  {
    "id": "prod-e3",
    "title": "Baroque Pearl & Gold Leaf Sculptural Dangle Earrings",
    "description": "Natural organic freshwater pearl drops suspended from organic hand-hammered 18K gold leaf studs.",
    "price": 145,
    "original_price": 210,
    "discount_percent": 30,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 4.9,
    "review_count": 92,
    "sold_count": "430+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 20,
    "tags": [
      "Baroque Pearl",
      "Gold Leaf",
      "Dangle Earrings",
      "Sculptural"
    ],
    "images": [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T15:00:00.000Z"
  },
  {
    "id": "prod-e4",
    "title": "Textured Abstract Geometric Gold Stud Earrings",
    "description": "Chic brushed gold molten abstract disc studs that sit flush against the earlobe. Minimalist runway aesthetic.",
    "price": 115,
    "original_price": 165,
    "discount_percent": 30,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 4.8,
    "review_count": 140,
    "sold_count": "690+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 30,
    "tags": [
      "Gold Studs",
      "Abstract Disc",
      "Minimalist",
      "Everyday Wear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T17:00:00.000Z"
  },
  {
    "id": "prod-e5",
    "title": "Emerald Green Zirconia Huggie Hoop Earrings (3-Pair Set)",
    "description": "Set of three graduated 18K gold huggie hoop earrings featuring emerald cut simulated green zirconia stones.",
    "price": 150,
    "original_price": 220,
    "discount_percent": 31,
    "category_id": "cat-earrings",
    "category_name": "Earrings & Hoops",
    "rating": 4.9,
    "review_count": 175,
    "sold_count": "870+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 22,
    "tags": [
      "Huggie Hoops",
      "Emerald Zirconia",
      "Earring Stack",
      "3-Pair Set"
    ],
    "images": [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T12:00:00.000Z"
  },
  {
    "id": "prod-j3",
    "title": "Emerald Cut Radiant Crystal Cocktail Ring Set (4-Piece)",
    "description": "Adjustable luxury stacking rings with simulated emerald centerstone, micro-pave eternity band, and twisted rope accents.",
    "price": 145,
    "original_price": 210,
    "discount_percent": 31,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 4.9,
    "review_count": 312,
    "sold_count": "2.1k+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Stacking Rings",
      "Emerald Cut",
      "Adjustable",
      "Party Wear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-12T12:00:00.000Z"
  },
  {
    "id": "prod-j5",
    "title": "18K Rose Gold Marquise Cut Crystal Halo Tennis Bracelet",
    "description": "High-clarity cubic zirconia stones set in triple-plated 18K rose gold with double safety clasp lock. Tarnish-free and hypoallergenic for daily elegance.",
    "price": 210,
    "original_price": 310,
    "discount_percent": 32,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 4.9,
    "review_count": 175,
    "sold_count": "1.1k+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 22,
    "tags": [
      "Tennis Bracelet",
      "18K Rose Gold",
      "Marquise Cut",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1611591475155-4284fa289329?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-13T12:30:00.000Z"
  },
  {
    "id": "prod-r1",
    "title": "24K Gold Plated Sculpted Chunky Cuff Bangle Bracelet",
    "description": "Bold molten gold open cuff bangle crafted from high-polished brass with thick 24K gold dip coating. Flexible size fit.",
    "price": 190,
    "original_price": 270,
    "discount_percent": 29,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 4.9,
    "review_count": 135,
    "sold_count": "610+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 20,
    "tags": [
      "Cuff Bangle",
      "24K Gold",
      "Chunky Bracelet",
      "Flash Sale"
    ],
    "images": [
      "https://images.unsplash.com/photo-1611591475155-4284fa289329?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-14T09:00:00.000Z"
  },
  {
    "id": "prod-r2",
    "title": "Zirconia Solitaire Eternity Stacking Ring Set (5-Piece)",
    "description": "5 delicate gold bands featuring pave crystals, solitaire baguettes, and beaded textures. Mix, match, or wear stacked.",
    "price": 160,
    "original_price": 230,
    "discount_percent": 30,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 4.8,
    "review_count": 190,
    "sold_count": "1.1k+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 25,
    "tags": [
      "Eternity Rings",
      "Stacking Set",
      "Zirconia Solitaire",
      "5-Piece"
    ],
    "images": [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-15T13:00:00.000Z"
  },
  {
    "id": "prod-r3",
    "title": "Vintage Ruby Red Crystal Cocktail Statement Ring",
    "description": "Deep ruby red oval centerstone wrapped in halo pave cubic zirconia crystals on a vintage gold filigree band.",
    "price": 140,
    "original_price": 200,
    "discount_percent": 30,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 4.9,
    "review_count": 88,
    "sold_count": "420+ sold",
    "is_flash_sale": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "stock_quantity": 15,
    "tags": [
      "Ruby Ring",
      "Cocktail Statement",
      "Vintage Filigree",
      "Adjustable"
    ],
    "images": [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-16T15:00:00.000Z"
  },
  {
    "id": "prod-r4",
    "title": "Triple-Row Diamond Mesh Gold Hinged Bangle",
    "description": "Hinged box clasp bangle decorated with three rows of radiant round brilliant simulated diamonds.",
    "price": 240,
    "original_price": 340,
    "discount_percent": 29,
    "category_id": "cat-rings",
    "category_name": "Rings & Bracelets",
    "rating": 5,
    "review_count": 145,
    "sold_count": "760+ sold",
    "is_flash_sale": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "stock_quantity": 18,
    "tags": [
      "Hinged Bangle",
      "Diamond Mesh",
      "Triple Row",
      "Gold Bracelet"
    ],
    "images": [
      "https://images.unsplash.com/photo-1611591475155-4284fa289329?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    "created_at": "2026-08-17T17:00:00.000Z"
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    "id": "sub-1",
    "full_name": "Fatmata Koroma",
    "phone_number": "+23276112233",
    "email": "fatmata.k@gmail.com",
    "subscribed_at": "2026-08-01T12:00:00.000Z",
    "notes": "VIP Client • Loves Silk Maxi Gowns & Gold Serums"
  },
  {
    "id": "sub-2",
    "full_name": "Mariama Sesay",
    "phone_number": "+23278445566",
    "email": "m.sesay@yahoo.com",
    "subscribed_at": "2026-08-03T15:20:00.000Z",
    "notes": "Regular gala attendee in Freetown"
  },
  {
    "id": "sub-3",
    "full_name": "Aminata Bangura",
    "phone_number": "+23230998877",
    "email": "amina.bangura@outlook.com",
    "subscribed_at": "2026-08-05T09:10:00.000Z",
    "notes": "Interested in bridal entourage pieces"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    "id": "ord-101",
    "reference_code": "ML-78921",
    "customer_name": "Fatmata Koroma",
    "customer_phone": "076 112 233",
    "delivery_address": "24 Wilkinson Road, Freetown",
    "city": "Freetown",
    "items": [
      {
        "product_id": "prod-j1",
        "title": "18K Gold Plated Zirconia Celestial Necklace Set",
        "price": 185,
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
        "line_total": 185
      },
      {
        "product_id": "prod-4",
        "title": "Botanical Illuminating Body Nectar Oil (150ml)",
        "price": 195,
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1608248597359-577c223c683b?auto=format&fit=crop&w=400&q=80",
        "line_total": 195
      }
    ],
    "total_amount": 380,
    "payment_method": "Orange Money",
    "status": "confirmed",
    "notes": "Customer confirmed OM payment via WhatsApp",
    "created_at": "2026-08-14T16:20:00.000Z"
  }
];
