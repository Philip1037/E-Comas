'use client';

import React, { useState, useEffect } from 'react';
import { getStoredProducts, deleteProduct, toggleProductStock, getStoredSubscribers, getStoredSettings, getStoredCategories } from '@/lib/storage';
import { Product, Subscriber, BoutiqueSettings, Category } from '@/lib/types';
import { Plus, Edit2, Trash2, Sparkles, Search, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';
import BroadcastModal from '@/components/admin/BroadcastModal';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [settings, setSettings] = useState<BoutiqueSettings>(getStoredSettings());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [broadcastProduct, setBroadcastProduct] = useState<Product | null>(null);

  const loadData = () => {
    setProducts(getStoredProducts());
    setCategories(getStoredCategories());
    setSubscribers(getStoredSubscribers());
    setSettings(getStoredSettings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this item from the boutique?')) {
      deleteProduct(id);
      loadData();
    }
  };

  const handleToggleStock = (id: string) => {
    toggleProductStock(id);
    loadData();
  };

  const handleEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleSaved = (product: Product, broadcastRequested: boolean) => {
    loadData();
    if (broadcastRequested) {
      setBroadcastProduct(product);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      selectedCategory === 'all' || p.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Inventory &amp; Batch Drops
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your boutique clothing, cosmetics, prices in SLE, and stock statuses
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-5 py-3 rounded-2xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Boutique Item</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name or tags..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-semibold shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059] cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (SLE)</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 text-sm">
                    No products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isOutOfStock = product.stock_quantity <= 0;
                  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 4;
                  const img = product.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80';

                  return (
                    <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={img}
                            alt={product.title}
                            className="w-12 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-stone-900 line-clamp-1">{product.title}</h4>
                            <p className="text-[11px] text-stone-400 line-clamp-1 font-light max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-stone-600 font-medium">
                        {product.category_name || 'Boutique Collection'}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-stone-900 font-mono">
                        SLE {product.price.toFixed(2)}
                      </td>

                      {/* Stock Switcher */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStock(product.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isOutOfStock
                                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                : isLowStock
                                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }`}
                            title="Click to toggle stock status"
                          >
                            {isOutOfStock ? (
                              <>
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Out of Stock</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>In Stock ({product.stock_quantity})</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.is_new_arrival && (
                            <span className="px-2 py-0.5 rounded-md bg-[#18161b] text-white text-[10px] font-semibold">
                              New
                            </span>
                          )}
                          {product.is_best_seller && (
                            <span className="px-2 py-0.5 rounded-md bg-[#c5a059] text-stone-950 text-[10px] font-bold">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setBroadcastProduct(product)}
                            className="p-2 rounded-lg bg-[#faf6f0] hover:bg-[#ecd09f] text-[#b88d3e] hover:text-stone-950 transition-colors"
                            title="Dispatch VIP Broadcast for this item"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                            title="Edit Item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productToEdit={editingProduct}
        onSaved={handleSaved}
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
