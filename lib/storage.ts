'use client';

import { Product, Subscriber, Order, BoutiqueSettings, CartItem, Category } from './types';
import { INITIAL_PRODUCTS, INITIAL_SUBSCRIBERS, INITIAL_ORDERS, DEFAULT_SETTINGS, INITIAL_CATEGORIES } from './data';

const STORAGE_KEYS = {
  PRODUCTS: 'boutique_products_v4',
  SUBSCRIBERS: 'boutique_subscribers_v1',
  ORDERS: 'boutique_orders_v1',
  SETTINGS: 'boutique_settings_v1',
  CATEGORIES: 'boutique_categories_v4',
  CART: 'boutique_cart_v1',
  ADMIN_AUTH: 'boutique_admin_auth_v1',
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

// Products
export function getStoredProducts(): Product[] {
  const products = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  // Auto-heal any stale or broken legacy image URLs
  const healed = products.map((p) => {
    const initialMatch = INITIAL_PRODUCTS.find((init) => init.id === p.id);
    if (initialMatch && (!p.images || p.images.some((img) => img.includes('photo-1608248597359-577c223c683b') || img.includes('photo-1539109136881-3be0616acf4b')))) {
      return { ...p, images: initialMatch.images };
    }
    return p;
  });
  return healed;
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
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  saveStoredProducts(products);
  return updatedProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveStoredProducts(filtered);
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
  return { success: true, message: "Welcome to the Maison Lumière VIP Club!", subscriber: newSub };
}

export function deleteSubscriber(id: string): void {
  const subscribers = getStoredSubscribers();
  const filtered = subscribers.filter((s) => s.id !== id);
  setLocalItem(STORAGE_KEYS.SUBSCRIBERS, filtered);
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

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order['status']): Order | null {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;
  order.status = status;
  setLocalItem(STORAGE_KEYS.ORDERS, orders);
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

export function saveStoredSettings(settings: BoutiqueSettings): void {
  setLocalItem(STORAGE_KEYS.SETTINGS, settings);
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
