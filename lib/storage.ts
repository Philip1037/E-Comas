'use client';

import { Product, Subscriber, Order, BoutiqueSettings, CartItem, Category } from './types';
import { INITIAL_PRODUCTS, INITIAL_SUBSCRIBERS, INITIAL_ORDERS, DEFAULT_SETTINGS, INITIAL_CATEGORIES } from './data';
import { supabase } from './supabase';

const STORAGE_KEYS = {
  PRODUCTS: 'boutique_products_v5',
  SUBSCRIBERS: 'boutique_subscribers_v1',
  ORDERS: 'boutique_orders_v1',
  SETTINGS: 'boutique_settings_v1',
  CATEGORIES: 'boutique_categories_v5',
  CART: 'boutique_cart_v1',
  ADMIN_AUTH: 'boutique_admin_auth_v1',
  DELETED_PRODUCTS: 'boutique_deleted_products_v1',
};

// Safe LocalStorage helpers
function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Deleted Products helpers
export function getDeletedProductIds(): string[] {
  return getLocalItem<string[]>(STORAGE_KEYS.DELETED_PRODUCTS, []);
}

export function markProductDeleted(id: string): void {
  const deleted = getDeletedProductIds();
  if (!deleted.includes(id)) {
    setLocalItem(STORAGE_KEYS.DELETED_PRODUCTS, [...deleted, id]);
  }
}

export function clearDeletedProducts(): void {
  setLocalItem(STORAGE_KEYS.DELETED_PRODUCTS, []);
}

// Global Supabase Sync Initializer (runs async in background on app load)
export async function initializeDatabaseSync(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const deletedIds = new Set(getDeletedProductIds());

    // 1. Fetch & Sync Products
    const { data: dbProducts } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    
    // Read local products currently stored in localStorage
    const localProducts = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, []);

    const seenTitles = new Set<string>();
    const seenIds = new Set<string>();
    const mergedProducts: Product[] = [];

    const addIfValid = (p: Product) => {
      const titleKey = (p.title || '').trim().toLowerCase();
      if (!titleKey) return;
      if (p.id && deletedIds.has(p.id)) return;
      if (seenTitles.has(titleKey) || (p.id && seenIds.has(p.id))) return;
      seenTitles.add(titleKey);
      if (p.id) seenIds.add(p.id);
      mergedProducts.push(p);
    };

    // First priority: DB products
    if (dbProducts && dbProducts.length > 0) {
      for (const p of dbProducts) {
        addIfValid({
          id: p.id,
          title: p.title,
          description: p.description || '',
          price: Number(p.price),
          category_id: p.category_id || 'all',
          images: p.images || [],
          stock_quantity: p.stock_quantity ?? 10,
          is_new_arrival: p.is_new_arrival ?? true,
          is_best_seller: p.is_best_seller ?? false,
          is_active: p.is_active ?? true,
          tags: p.tags || [],
          created_at: p.created_at,
        });
      }
    }

    // Second priority: existing products in localStorage
    for (const p of localProducts) {
      addIfValid(p);
    }

    // Third priority: fallback INITIAL_PRODUCTS
    for (const p of INITIAL_PRODUCTS) {
      addIfValid(p);
    }

    // Save complete merged products to localStorage
    setLocalItem(STORAGE_KEYS.PRODUCTS, mergedProducts);

    // Seed/upsert missing items into Supabase
    const dbTitles = new Set((dbProducts || []).map((p) => (p.title || '').trim().toLowerCase()));
    for (const prod of mergedProducts) {
      const titleKey = (prod.title || '').trim().toLowerCase();
      if (!dbTitles.has(titleKey)) {
        await supabase.from('products').upsert({
          title: prod.title,
          description: prod.description,
          price: prod.price,
          images: prod.images,
          stock_quantity: prod.stock_quantity,
          is_new_arrival: prod.is_new_arrival,
          is_best_seller: prod.is_best_seller,
          is_active: prod.is_active,
          tags: prod.tags,
        }, { onConflict: 'title' });
      }
    }

    // 2. Fetch & Sync Settings
    const { data: dbSettings } = await supabase.from('boutique_settings').select('*').eq('id', 1).single();
    if (dbSettings) {
      setLocalItem(STORAGE_KEYS.SETTINGS, {
        brand_name: dbSettings.brand_name || DEFAULT_SETTINGS.brand_name,
        tagline: dbSettings.tagline || DEFAULT_SETTINGS.tagline,
        admin_whatsapp: dbSettings.admin_whatsapp || DEFAULT_SETTINGS.admin_whatsapp,
        whatsapp_group_link: dbSettings.whatsapp_group_link || DEFAULT_SETTINGS.whatsapp_group_link,
        orange_money_number: dbSettings.orange_money_number || DEFAULT_SETTINGS.orange_money_number,
        orange_money_merchant_id: dbSettings.orange_money_merchant_id || DEFAULT_SETTINGS.orange_money_merchant_id,
        orange_money_ussd_template: dbSettings.orange_money_ussd_template || DEFAULT_SETTINGS.orange_money_ussd_template,
        afrimoney_number: dbSettings.afrimoney_number || DEFAULT_SETTINGS.afrimoney_number,
        afrimoney_merchant_id: dbSettings.afrimoney_merchant_id || DEFAULT_SETTINGS.afrimoney_merchant_id,
        afrimoney_ussd_template: dbSettings.afrimoney_ussd_template || DEFAULT_SETTINGS.afrimoney_ussd_template,
        currency_code: dbSettings.currency_code || DEFAULT_SETTINGS.currency_code,
        currency_symbol: dbSettings.currency_symbol || DEFAULT_SETTINGS.currency_symbol,
        delivery_fee: Number(dbSettings.delivery_fee) || DEFAULT_SETTINGS.delivery_fee,
        free_delivery_threshold: Number(dbSettings.free_delivery_threshold) || DEFAULT_SETTINGS.free_delivery_threshold,
        contact_email: dbSettings.contact_email || DEFAULT_SETTINGS.contact_email,
        store_address: dbSettings.store_address || DEFAULT_SETTINGS.store_address,
        demo_mode_enabled: dbSettings.demo_mode_enabled ?? true,
        admin_username: dbSettings.admin_username || DEFAULT_SETTINGS.admin_username,
        admin_password: dbSettings.admin_password || DEFAULT_SETTINGS.admin_password,
        admin_recovery_email: dbSettings.admin_recovery_email || DEFAULT_SETTINGS.admin_recovery_email,
      });
    }

    // 3. Fetch & Sync Orders
    const { data: dbOrders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (dbOrders && dbOrders.length > 0) {
      const formattedOrders: Order[] = dbOrders.map((o) => ({
        id: o.id,
        reference_code: o.reference_code,
        customer_name: o.customer_name,
        customer_phone: o.customer_phone,
        delivery_address: o.delivery_address,
        city: o.city,
        items: o.items || [],
        total_amount: Number(o.total_amount),
        payment_method: o.payment_method,
        status: o.status,
        notes: o.notes || '',
        created_at: o.created_at,
      }));
      setLocalItem(STORAGE_KEYS.ORDERS, formattedOrders);
    }

    // 4. Fetch & Sync Subscribers
    const { data: dbSubscribers } = await supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false });
    if (dbSubscribers && dbSubscribers.length > 0) {
      const formattedSubs: Subscriber[] = dbSubscribers.map((s) => ({
        id: s.id,
        full_name: s.full_name,
        phone_number: s.phone_number,
        email: s.email,
        notes: s.notes || '',
        subscribed_at: s.subscribed_at,
      }));
      setLocalItem(STORAGE_KEYS.SUBSCRIBERS, formattedSubs);
    }
  } catch (error) {
    console.warn('Database sync warning:', error);
  }
}

// Products
export function getStoredProducts(): Product[] {
  const products = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  if (!products || products.length === 0) {
    return INITIAL_PRODUCTS;
  }
  return products;
}

export function saveStoredProducts(products: Product[]): void {
  setLocalItem(STORAGE_KEYS.PRODUCTS, products);
}

export function addProduct(product: Omit<Product, 'id' | 'created_at'>): Product {
  const products = getStoredProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  const updated = [newProduct, ...products];
  saveStoredProducts(updated);

  // Sync to Supabase
  supabase.from('products').upsert({
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images,
    stock_quantity: product.stock_quantity,
    is_new_arrival: product.is_new_arrival,
    is_best_seller: product.is_best_seller,
    is_active: product.is_active,
    tags: product.tags,
  }, { onConflict: 'title' }).then(({ error }) => {
    if (error) console.error('Error inserting product into Supabase:', error);
  });

  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  saveStoredProducts(products);

  // Sync to Supabase
  supabase.from('products').upsert({
    title: updatedProduct.title,
    description: updatedProduct.description,
    price: updatedProduct.price,
    images: updatedProduct.images,
    stock_quantity: updatedProduct.stock_quantity,
    is_new_arrival: updatedProduct.is_new_arrival,
    is_best_seller: updatedProduct.is_best_seller,
    is_active: updatedProduct.is_active,
    tags: updatedProduct.tags,
  }, { onConflict: 'title' }).then(({ error }) => {
    if (error) console.error('Error updating product in Supabase:', error);
  });

  return updatedProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getStoredProducts();
  const targetProduct = products.find((p) => p.id === id);
  markProductDeleted(id);
  const filtered = products.filter((p) => p.id !== id);
  saveStoredProducts(filtered);

  // Sync to Supabase
  if (targetProduct) {
    supabase.from('products').delete().eq('title', targetProduct.title).then(({ error }) => {
      if (error) console.error('Error deleting product by title from Supabase:', error);
    });
  }
  supabase.from('products').delete().eq('id', id).then(({ error }) => {
    if (error) console.error('Error deleting product from Supabase:', error);
  });

  return true;
}

export function toggleProductStock(id: string): Product | null {
  const products = getStoredProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  const newQty = product.stock_quantity > 0 ? 0 : 10;
  return updateProduct(id, { stock_quantity: newQty });
}

// Categories
export function getStoredCategories(): Category[] {
  return getLocalItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export function saveStoredCategories(categories: Category[]): void {
  setLocalItem(STORAGE_KEYS.CATEGORIES, categories);
}

export function addCategory(name: string): Category {
  const categories = getStoredCategories();
  const trimmed = name.trim();
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existing = categories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) return existing;

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: trimmed,
    slug: slug,
    description: `${trimmed} boutique collection`,
    icon: 'Sparkles',
  };
  const updated = [...categories, newCat];
  saveStoredCategories(updated);
  return newCat;
}

// Subscribers
export function getStoredSubscribers(): Subscriber[] {
  return getLocalItem<Subscriber[]>(STORAGE_KEYS.SUBSCRIBERS, INITIAL_SUBSCRIBERS);
}

export function addSubscriber(sub: Omit<Subscriber, 'id' | 'subscribed_at'>): { success: boolean; message: string; subscriber?: Subscriber } {
  const subscribers = getStoredSubscribers();
  const existing = subscribers.find(
    (s) => s.phone_number.replace(/\D/g, '') === sub.phone_number.replace(/\D/g, '') ||
           (sub.email && s.email?.toLowerCase() === sub.email?.toLowerCase())
  );
  if (existing) {
    return { success: false, message: "You are already a registered VIP Member!" };
  }
  const newSub: Subscriber = {
    ...sub,
    id: `sub-${Date.now()}`,
    subscribed_at: new Date().toISOString(),
  };
  const updated = [newSub, ...subscribers];
  setLocalItem(STORAGE_KEYS.SUBSCRIBERS, updated);

  // Sync to Supabase
  supabase.from('subscribers').insert({
    full_name: sub.full_name,
    phone_number: sub.phone_number,
    email: sub.email,
    notes: sub.notes,
  }).then(({ error }) => {
    if (error) console.error('Error inserting subscriber into Supabase:', error);
  });

  return { success: true, message: "Welcome to the Maison Lumière VIP Club!", subscriber: newSub };
}

export function deleteSubscriber(id: string): void {
  const subscribers = getStoredSubscribers();
  const filtered = subscribers.filter((s) => s.id !== id);
  setLocalItem(STORAGE_KEYS.SUBSCRIBERS, filtered);

  supabase.from('subscribers').delete().eq('id', id).then(({ error }) => {
    if (error) console.error('Error deleting subscriber from Supabase:', error);
  });
}

export function exportSubscribersToCSV(): void {
  const subscribers = getStoredSubscribers();
  const headers = ['Full Name', 'Phone Number', 'Email', 'Date Subscribed', 'Notes'];
  const rows = subscribers.map((s) => [
    `"${s.full_name.replace(/"/g, '""')}"`,
    `"${s.phone_number}"`,
    `"${s.email || ''}"`,
    `"${new Date(s.subscribed_at).toLocaleDateString()}"`,
    `"${(s.notes || '').replace(/"/g, '""')}"`,
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `VIP_Subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function saveStoredSubscribers(subscribers: Subscriber[]): void {
  setLocalItem(STORAGE_KEYS.SUBSCRIBERS, subscribers);
}

// Orders
export function getStoredOrders(): Order[] {
  return getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
}

export function saveStoredOrders(orders: Order[]): void {
  setLocalItem(STORAGE_KEYS.ORDERS, orders);
}

export function createOrderRecord(orderData: Omit<Order, 'id' | 'reference_code' | 'created_at'>): Order {
  const orders = getStoredOrders();
  const randomRef = 'ML-' + Math.floor(10000 + Math.random() * 90000);
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    reference_code: randomRef,
    created_at: new Date().toISOString(),
  };
  const updated = [newOrder, ...orders];
  setLocalItem(STORAGE_KEYS.ORDERS, updated);

  // Decrement stock for ordered items
  const products = getStoredProducts();
  newOrder.items.forEach((item) => {
    const prod = products.find((p) => p.id === item.product_id);
    if (prod) {
      prod.stock_quantity = Math.max(0, prod.stock_quantity - item.quantity);
    }
  });
  saveStoredProducts(products);

  // Sync to Supabase
  supabase.from('orders').insert({
    reference_code: randomRef,
    customer_name: orderData.customer_name,
    customer_phone: orderData.customer_phone,
    delivery_address: orderData.delivery_address,
    city: orderData.city || 'Freetown',
    items: orderData.items,
    total_amount: orderData.total_amount,
    payment_method: orderData.payment_method,
    status: orderData.status,
    notes: orderData.notes,
  }).then(({ error }) => {
    if (error) console.error('Error inserting order into Supabase:', error);
  });

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order['status']): Order | null {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;
  order.status = status;
  setLocalItem(STORAGE_KEYS.ORDERS, orders);

  supabase.from('orders').update({ status }).eq('id', orderId).then(({ error }) => {
    if (error) console.error('Error updating order status in Supabase:', error);
  });

  return order;
}

// Cart
export function getStoredCart(): CartItem[] {
  return getLocalItem<CartItem[]>(STORAGE_KEYS.CART, []);
}

export function saveStoredCart(cart: CartItem[]): void {
  setLocalItem(STORAGE_KEYS.CART, cart);
}

// Settings
export function getStoredSettings(): BoutiqueSettings {
  return getLocalItem<BoutiqueSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function saveStoredSettings(settings: BoutiqueSettings): Promise<void> {
  setLocalItem(STORAGE_KEYS.SETTINGS, settings);

  // Sync to Supabase boutique_settings table
  const { error } = await supabase.from('boutique_settings').upsert({
    id: 1,
    brand_name: settings.brand_name,
    tagline: settings.tagline,
    admin_whatsapp: settings.admin_whatsapp,
    whatsapp_group_link: settings.whatsapp_group_link,
    orange_money_number: settings.orange_money_number,
    orange_money_merchant_id: settings.orange_money_merchant_id,
    orange_money_ussd_template: settings.orange_money_ussd_template,
    afrimoney_number: settings.afrimoney_number,
    afrimoney_merchant_id: settings.afrimoney_merchant_id,
    afrimoney_ussd_template: settings.afrimoney_ussd_template,
    currency_code: settings.currency_code,
    currency_symbol: settings.currency_symbol,
    delivery_fee: settings.delivery_fee,
    free_delivery_threshold: settings.free_delivery_threshold,
    contact_email: settings.contact_email,
    store_address: settings.store_address,
    demo_mode_enabled: settings.demo_mode_enabled,
    admin_username: settings.admin_username,
    admin_password: settings.admin_password,
    admin_recovery_email: settings.admin_recovery_email,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('Error saving settings to Supabase:', error);
}


// Admin Auth State
export function isUserAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (typeof window === 'undefined') return;
  if (auth) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}
