'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredProducts, getStoredOrders, getStoredSubscribers, getStoredSettings, updateOrderStatus } from '@/lib/storage';
import { Product, Order, Subscriber, BoutiqueSettings } from '@/lib/types';
import {
  TrendingUp,
  Package,
  Users,
  ShoppingBag,
  AlertTriangle,
  Plus,
  Sparkles,
  ArrowRight,
  Phone,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';
import BroadcastModal from '@/components/admin/BroadcastModal';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [settings, setSettings] = useState<BoutiqueSettings>(getStoredSettings());

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [broadcastProduct, setBroadcastProduct] = useState<Product | null>(null);

  const refreshData = () => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setSubscribers(getStoredSubscribers());
    setSettings(getStoredSettings());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const totalSales = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total_amount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const lowStockItems = products.filter((p) => p.stock_quantity <= 4);

  const handleProductSaved = (newProd: Product, broadcastRequested: boolean) => {
    refreshData();
    if (broadcastRequested) {
      setBroadcastProduct(newProd);
    }
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Boutique Overview
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time Sierra Leone storefront analytics, inventory alerts &amp; order leads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales</span>
            <div className="p-2 rounded-xl bg-amber-50 text-[#c5a059]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              SLE {totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="block text-[11px] text-stone-400 mt-0.5">From {orders.length} order inquiries</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pending Orders</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {pendingOrders.length}
            </span>
            <span className="block text-[11px] text-stone-400 mt-0.5">Awaiting dispatch confirmation</span>
          </div>
        </div>

        {/* VIP Subscribers */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">VIP Members</span>
            <div className="p-2 rounded-xl bg-rose-50 text-[#d47a82]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {subscribers.length}
            </span>
            <span className="block text-[11px] text-stone-400 mt-0.5">Registered for WhatsApp drops</span>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Low Stock Alerts</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {lowStockItems.length}
            </span>
            <span className="block text-[11px] text-stone-400 mt-0.5">Items with &le; 4 units left</span>
          </div>
        </div>
      </div>

      {/* Quick Launch Banner */}
      <div className="p-6 rounded-3xl bg-[#141216] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-stone-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#f5ebd7]">
              Fresh Batch Drop Ready to Announce?
            </h3>
            <p className="text-xs text-stone-400">
              Launch a broadcast notice with exclusive promo codes to all {subscribers.length} VIP members.
            </p>
          </div>
        </div>

        <Link
          href="/admin/subscribers"
          className="px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#ecd09f] text-stone-950 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <span>Open VIP Dispatcher</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900">Recent Order Inquiries</h2>
            <p className="text-xs text-stone-500">Live storefront orders generated through WhatsApp &amp; Mobile Money</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#c5a059] hover:underline flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Ref Code</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Delivery Address</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Total (SLE)</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-stone-900">
                    {order.reference_code}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-stone-900">{order.customer_name}</p>
                    <a
                      href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{order.customer_phone}</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-3 text-stone-600 max-w-xs truncate">
                    {order.delivery_address}
                  </td>
                  <td className="py-3.5 px-3 text-stone-700">
                    {order.items.map((it) => `${it.title} (x${it.quantity})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-stone-900">
                    SLE {order.total_amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold">
                      {order.payment_method}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                        order.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : order.status === 'dispatched'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : order.status === 'delivered'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : order.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaved={handleProductSaved}
      />

      <BroadcastModal
        isOpen={!!broadcastProduct}
        onClose={() => setBroadcastProduct(null)}
        product={broadcastProduct}
        subscribers={subscribers}
        settings={settings}
      />
    </div>
  );
}
