'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product, Category } from '@/lib/types';
import { addProduct, updateProduct, getStoredCategories, addCategory } from '@/lib/storage';
import { X, Plus, Trash2, Sparkles, Check, UploadCloud, Link as LinkIcon, Image as ImageIcon, FolderPlus } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: (product: Product, broadcastRequested: boolean) => void;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState('');
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [stockQuantity, setStockQuantity] = useState<number | ''>(10);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string>('New Arrival, Boutique');
  const [broadcastToVip, setBroadcastToVip] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Load categories
  const reloadCategories = () => {
    const cats = getStoredCategories();
    setCategories(cats);
    return cats;
  };

  useEffect(() => {
    reloadCategories();
  }, [isOpen]);

  useEffect(() => {
    const cats = reloadCategories();
    if (productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setCategoryId(productToEdit.category_id);
      setIsCreatingNewCategory(false);
      setNewCategoryName('');
      setStockQuantity(productToEdit.stock_quantity);
      setIsNewArrival(productToEdit.is_new_arrival);
      setIsBestSeller(!!productToEdit.is_best_seller);
      setImages(productToEdit.images?.length > 0 ? productToEdit.images : []);
      setTags(productToEdit.tags?.join(', ') || '');
      setBroadcastToVip(false);
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
      setCategoryId(cats[0]?.id || 'cat-1');
      setIsCreatingNewCategory(false);
      setNewCategoryName('');
      setStockQuantity(10);
      setIsNewArrival(true);
      setIsBestSeller(false);
      setImages([]);
      setTags('New Batch Drops, Runway');
      setBroadcastToVip(true);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle direct file uploads from phone camera/gallery or PC
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const fileArray = Array.from(files);

    const promises = fileArray.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new window.Image();
          img.onload = () => {
            // Compress and resize image to fit gracefully
            const canvas = document.createElement('canvas');
            const maxDimension = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height && width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            // Compress to WebP / JPEG base64
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            resolve(compressedDataUrl);
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((dataUrls) => {
      setImages((prev) => [...prev, ...dataUrls]);
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleAddImageUrl = () => {
    const url = prompt('Enter or paste image URL (e.g. https://images.unsplash.com/...):');
    if (url && url.trim()) {
      setImages((prev) => [...prev, url.trim()]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price === '' || Number(price) <= 0) {
      alert('Please fill in product title and a valid price in SLE.');
      return;
    }

    // Resolve Category: If admin typed a custom category, create it
    let finalCategoryId = categoryId;
    let finalCategoryName = 'Boutique Collection';

    if (isCreatingNewCategory && newCategoryName.trim()) {
      const createdCategory = addCategory(newCategoryName.trim());
      finalCategoryId = createdCategory.id;
      finalCategoryName = createdCategory.name;
    } else {
      const selectedCat = categories.find((c) => c.id === categoryId);
      if (selectedCat) {
        finalCategoryName = selectedCat.name;
      }
    }

    // Clean images or provide luxury default if empty
    let cleanedImages = images.filter((img) => img.trim() !== '');
    if (cleanedImages.length === 0) {
      cleanedImages = [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      ];
    }

    const splitTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (productToEdit) {
      const updated = updateProduct(productToEdit.id, {
        title,
        description,
        price: Number(price),
        category_id: finalCategoryId,
        category_name: finalCategoryName,
        stock_quantity: Number(stockQuantity) || 0,
        is_new_arrival: isNewArrival,
        is_best_seller: isBestSeller,
        images: cleanedImages,
        tags: splitTags,
      });
      if (updated) {
        onSaved(updated, false);
      }
    } else {
      const created = addProduct({
        title,
        description,
        price: Number(price),
        category_id: finalCategoryId,
        category_name: finalCategoryName,
        stock_quantity: Number(stockQuantity) || 0,
        is_new_arrival: isNewArrival,
        is_best_seller: isBestSeller,
        is_active: true,
        images: cleanedImages,
        tags: splitTags,
      });
      onSaved(created, broadcastToVip);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#18161b] text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#f5ebd7]">
              {productToEdit ? 'Edit Boutique Item' : 'Add New Runway / Cosmetics Item'}
            </h3>
            <p className="text-xs text-stone-400">
              Upload photos from your device, configure SLE price &amp; category
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Emerald Satin Maxi Dress"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {/* Category & Price (SLE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown & Custom Typing */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
                  className="text-xs text-[#b88d3e] hover:underline font-semibold flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>{isCreatingNewCategory ? 'Choose Existing' : '+ Type New Category'}</span>
                </button>
              </div>

              {!isCreatingNewCategory ? (
                <select
                  value={categoryId}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsCreatingNewCategory(true);
                    } else {
                      setCategoryId(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059] cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value="__new__" className="font-bold text-[#b88d3e]">
                    + Create New Custom Category...
                  </option>
                </select>
              ) : (
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Type category (e.g. Handbags, Jewelry, Shoes)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-[#c5a059] text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    autoFocus
                  />
                  <span className="text-[11px] text-[#b88d3e] block">
                    ✨ Will be automatically added to the dropdown and filter tabs.
                  </span>
                </div>
              )}
            </div>

            {/* Price (SLE) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Price in Leone (SLE) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-stone-500">
                  SLE
                </span>
                <input
                  type="number"
                  step="any"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 450"
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            </div>
          </div>

          {/* Stock Quantity & Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="10"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isNewArrival"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="w-4 h-4 text-[#c5a059] rounded border-stone-300 focus:ring-[#c5a059] cursor-pointer"
              />
              <label htmlFor="isNewArrival" className="text-xs font-semibold text-stone-700 cursor-pointer">
                New Arrival Tag
              </label>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isBestSeller"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="w-4 h-4 text-[#c5a059] rounded border-stone-300 focus:ring-[#c5a059] cursor-pointer"
              />
              <label htmlFor="isBestSeller" className="text-xs font-semibold text-stone-700 cursor-pointer">
                Best Seller Badge
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Description &amp; Highlights
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide fabric details, styling notes, skincare benefits..."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Silk Chiffon, Evening, 24K Gold"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {/* PRODUCT PHOTOS: DIRECT DEVICE UPLOAD & IMAGE URLS */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                  Product Photos ({images.length})
                </label>
                <p className="text-[11px] text-stone-500">
                  Upload photos directly from your phone camera / laptop or paste an image URL.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                {/* Upload from Phone/PC Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-1.5 rounded-xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isUploading ? 'Compressing...' : 'Upload from Phone/PC'}</span>
                </button>

                {/* Add URL Button */}
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Paste URL</span>
                </button>
              </div>
            </div>

            {/* Uploaded Image Previews */}
            {images.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-[#c5a059] bg-white cursor-pointer transition-colors space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-stone-100 text-[#c5a059] flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-stone-700">
                  Tap here to upload product pictures from your device
                </p>
                <p className="text-[11px] text-stone-400">
                  Supports JPEG, PNG, WEBP from your phone camera or computer
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden bg-stone-200 border border-stone-300 group shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`Product preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Primary Badge */}
                    {idx === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#18161b]/90 text-[#f5ebd7] text-[9px] font-bold">
                        Main Cover
                      </span>
                    )}

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/75 text-white hover:bg-rose-600 transition-colors shadow"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VIP Broadcast Option on New Product Creation */}
          {!productToEdit && (
            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#ecd09f] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="broadcastToVip"
                  checked={broadcastToVip}
                  onChange={(e) => setBroadcastToVip(e.target.checked)}
                  className="w-5 h-5 text-[#c5a059] rounded border-stone-300 focus:ring-[#c5a059] cursor-pointer"
                />
                <div>
                  <label htmlFor="broadcastToVip" className="text-xs font-bold text-stone-900 cursor-pointer block">
                    ☑️ Broadcast to VIP Subscribers
                  </label>
                  <p className="text-[11px] text-stone-500">
                    Prepare instant WhatsApp broadcast payload for subscribers.
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-[#c5a059]" />
            </div>
          )}

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Save Product Changes' : 'Publish Product to Boutique'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
