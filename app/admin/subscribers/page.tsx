'use client';

import React, { useState, useEffect } from 'react';
import { getStoredSubscribers, deleteSubscriber, exportSubscribersToCSV, getStoredProducts, getStoredSettings } from '@/lib/storage';
import { Subscriber, Product, BoutiqueSettings } from '@/lib/types';
import {
  Users,
  Search,
  Download,
  Phone,
  Mail,
  Trash2,
  Sparkles,
  UserPlus,
  MessageCircle,
} from 'lucide-react';
import BroadcastModal from '@/components/admin/BroadcastModal';

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<BoutiqueSettings>(getStoredSettings());
  const [searchQuery, setSearchQuery] = useState('');
  const [broadcastProduct, setBroadcastProduct] = useState<Product | null>(null);

  const loadSubscribers = () => {
    setSubscribers(getStoredSubscribers());
    setProducts(getStoredProducts());
    setSettings(getStoredSettings());
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Remove this VIP subscriber from the broadcast list?')) {
      deleteSubscriber(id);
      loadSubscribers();
    }
  };

  const filteredSubscribers = subscribers.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.full_name.toLowerCase().includes(query) ||
      s.phone_number.includes(query) ||
      (s.email && s.email.toLowerCase().includes(query)) ||
      (s.notes && s.notes.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            VIP Subscriber CRM
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Registered customer phone numbers, emails, and WhatsApp batch notification targets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportSubscribersToCSV()}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#c5a059]" />
            <span>Export Subscribers (CSV)</span>
          </button>

          {products.length > 0 && (
            <button
              onClick={() => setBroadcastProduct(products[0])}
              className="px-4 py-2.5 rounded-xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Launch VIP Broadcast</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-50 text-[#d47a82]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase">Total VIP Club</span>
            <p className="text-xl font-bold text-stone-900 font-serif">{subscribers.length} Members</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase">WhatsApp Reach</span>
            <p className="text-xl font-bold text-stone-900 font-serif">{subscribers.length} Numbers</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase">Email Reach</span>
            <p className="text-xl font-bold text-stone-900 font-serif">
              {subscribers.filter((s) => s.email).length} Emails
            </p>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by full name, phone number (+232), or email address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
          />
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">VIP Customer Name</th>
                <th className="py-3.5 px-4">WhatsApp Phone</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Notes / Preferences</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 text-sm">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#faf6f0] border border-[#ecd09f] text-[#b88d3e] font-bold text-xs flex items-center justify-center">
                          {sub.full_name.charAt(0)}
                        </div>
                        <span className="font-bold text-stone-900">{sub.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-800">
                      <a
                        href={`https://wa.me/${sub.phone_number.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:underline bg-emerald-50 px-2 py-1 rounded-lg"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{sub.phone_number}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {sub.email ? (
                        <a href={`mailto:${sub.email}`} className="hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3 text-stone-400" />
                          <span>{sub.email}</span>
                        </a>
                      ) : (
                        <span className="text-stone-400 italic">WhatsApp Only</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {new Date(sub.subscribed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate">
                      {sub.notes || 'VIP Member'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${sub.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello ${sub.full_name}! Maison Lumière Concierge reaching out regarding our new arrivals.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Direct WhatsApp Chat"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Subscriber"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Modal */}
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
