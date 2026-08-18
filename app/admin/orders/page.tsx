'use client';

import React, { useState, useEffect } from 'react';
import { getStoredOrders, updateOrderStatus } from '@/lib/storage';
import { Order, OrderStatus } from '@/lib/types';
import {
  ShoppingBag,
  Search,
  Phone,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Filter,
  Eye,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      order.customer_name.toLowerCase().includes(query) ||
      order.customer_phone.includes(query) ||
      order.reference_code.toLowerCase().includes(query) ||
      order.delivery_address.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Order Inquiries &amp; Leads
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track customer orders received via WhatsApp checkout, Orange Money, AfriMoney &amp; Cash on Delivery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm">
            Total Inquiries: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, phone (+232), or Ref Code..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#18161b] text-white shadow-sm'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer &amp; Phone</th>
                <th className="py-3.5 px-4">Delivery Destination</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Grand Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-stone-400 text-sm">
                    No order inquiries found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {order.reference_code}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900">{order.customer_name}</p>
                      <a
                        href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello ${order.customer_name}, Maison Lumière contacting you regarding order ${order.reference_code}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px] mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{order.customer_phone}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate">
                      {order.delivery_address}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 max-w-xs truncate">
                      {order.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900 font-mono">
                      SLE {order.total_amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 font-semibold text-[10px]">
                        {order.payment_method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
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
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="View order details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400">Order Inquiry</span>
                <h3 className="font-mono text-xl font-bold text-stone-900">
                  {selectedOrder.reference_code}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
              >
                &times;
              </button>
            </div>

            {/* Customer & Delivery */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 space-y-1">
                <span className="text-stone-400 font-medium">Customer:</span>
                <p className="font-bold text-stone-900">{selectedOrder.customer_name}</p>
                <p className="text-emerald-700 font-mono">{selectedOrder.customer_phone}</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 space-y-1">
                <span className="text-stone-400 font-medium">Payment &amp; Status:</span>
                <p className="font-bold text-stone-900">{selectedOrder.payment_method}</p>
                <p className="capitalize font-bold text-[#c5a059]">{selectedOrder.status}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 text-xs space-y-1">
              <span className="text-stone-400 font-medium">Delivery Address:</span>
              <p className="font-semibold text-stone-800">{selectedOrder.delivery_address}</p>
              {selectedOrder.notes && (
                <p className="text-stone-500 italic mt-1">Notes: {selectedOrder.notes}</p>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Items Ordered ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{it.title}</p>
                      <p className="text-stone-500 text-[11px]">
                        Qty: {it.quantity} &times; SLE {it.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-bold text-stone-900">
                      SLE {it.line_total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-sm font-bold text-stone-900">
              <span>Grand Total:</span>
              <span className="font-serif text-lg text-[#18161b]">
                SLE {selectedOrder.total_amount.toFixed(2)}
              </span>
            </div>

            {/* Direct WhatsApp Contact Button */}
            <a
              href={`https://wa.me/${selectedOrder.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello ${selectedOrder.customer_name}! Your Maison Lumière order ${selectedOrder.reference_code} for SLE ${selectedOrder.total_amount.toFixed(2)} has been ${selectedOrder.status.toUpperCase()}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Customer via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
