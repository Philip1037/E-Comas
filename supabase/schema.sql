-- ==========================================================
-- MAISON LUMIÈRE BOUTIQUE - PostgreSQL / Supabase Schema
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  stock_quantity INT DEFAULT 0,
  is_new_arrival BOOLEAN DEFAULT true,
  is_best_seller BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. VIP Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Order Records Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  city TEXT DEFAULT 'Freetown',
  items JSONB NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL, -- 'Orange Money', 'AfriMoney', 'Cash on Delivery'
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Boutique Settings Table
CREATE TABLE IF NOT EXISTS boutique_settings (
  id INT PRIMARY KEY DEFAULT 1,
  brand_name TEXT DEFAULT 'MAISON LUMIÈRE',
  tagline TEXT DEFAULT 'Exclusive Women''s Couture & Luxury Botanical Cosmetics',
  admin_whatsapp TEXT DEFAULT '23276889900',
  whatsapp_group_link TEXT DEFAULT 'https://chat.whatsapp.com/LumiereVIPClubDemo',
  orange_money_number TEXT DEFAULT '076 889 900',
  orange_money_merchant_id TEXT DEFAULT 'OM-882190',
  orange_money_ussd_template TEXT DEFAULT '*144*3*{MERCHANT_ID}*{AMOUNT}#',
  afrimoney_number TEXT DEFAULT '088 123 456',
  afrimoney_merchant_id TEXT DEFAULT 'AF-550192',
  afrimoney_ussd_template TEXT DEFAULT '*161*2*{MERCHANT_ID}*{AMOUNT}#',
  currency_code TEXT DEFAULT 'SLE',
  currency_symbol TEXT DEFAULT 'SLE',
  delivery_fee NUMERIC(10, 2) DEFAULT 35.00,
  free_delivery_threshold NUMERIC(10, 2) DEFAULT 400.00,
  contact_email TEXT DEFAULT 'concierge@maisonlumiere.sl',
  store_address TEXT DEFAULT '14 Wilberforce Street, Freetown, Sierra Leone',
  demo_mode_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);


-- Insert Default Categories
INSERT INTO categories (name, slug, description, icon)
VALUES 
  ('Dresses & Outfits', 'dresses-outfits', 'Evening gowns, luxury silk wraps, cocktail dresses, and curated two-piece sets.', 'Sparkles'),
  ('Cosmetics & Skincare', 'cosmetics-skincare', 'Hydrating serums, melanin-glow foundations, velvet lip stains, and organic oils.', 'Heart'),
  ('New Batch Drops', 'new-batch-drops', 'Limited runway arrivals and exclusive batch editions freshly arrived in Freetown.', 'Flame'),
  ('Best Sellers', 'best-sellers', 'Our most coveted boutique fashion pieces and holy-grail skincare formulas.', 'Crown')
ON CONFLICT (slug) DO NOTHING;
