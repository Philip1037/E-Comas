export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // in Sierra Leone Leone (SLE)
  original_price?: number; // crossed original price for discount comparison
  discount_percent?: number; // e.g. 25 (-25% OFF)
  category_id: string;
  category_name?: string;
  images: string[];
  stock_quantity: number;
  is_new_arrival: boolean;
  is_best_seller?: boolean;
  is_flash_sale?: boolean;
  rating?: number; // e.g. 4.9
  review_count?: number; // e.g. 148
  sold_count?: string; // e.g. "1.2k+ sold"
  is_active: boolean;
  tags?: string[];
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Subscriber {
  id: string;
  full_name: string;
  phone_number: string;
  email?: string;
  subscribed_at: string;
  notes?: string;
}

export type PaymentMethod = 'Orange Money' | 'AfriMoney' | 'Cash on Delivery';

export type OrderStatus = 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItemSummary {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  line_total: number;
}

export interface Order {
  id: string;
  reference_code: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  city?: string;
  items: OrderItemSummary[];
  total_amount: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  notes?: string;
  created_at: string;
}

export interface BoutiqueSettings {
  brand_name: string;
  tagline: string;
  admin_whatsapp: string; // e.g. "23276123456"
  whatsapp_group_link?: string; // e.g. "https://chat.whatsapp.com/XYZ..."
  orange_money_number: string;
  orange_money_merchant_id: string;
  orange_money_ussd_template?: string; // e.g. "*144*3*{MERCHANT_ID}*{AMOUNT}#"
  afrimoney_number: string;
  afrimoney_merchant_id: string;
  afrimoney_ussd_template?: string; // e.g. "*161*2*{MERCHANT_ID}*{AMOUNT}#"
  currency_code: string; // SLE
  currency_symbol: string; // SLE
  delivery_fee: number;
  free_delivery_threshold: number;
  contact_email: string;
  store_address: string;
  demo_mode_enabled?: boolean;
  admin_username?: string;
  admin_password?: string;
  admin_recovery_email?: string;
  admin_reset_token?: string;
  admin_reset_expires?: string;
}



