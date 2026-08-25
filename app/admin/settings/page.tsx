'use client';

import React, { useState, useEffect } from 'react';
import { getStoredSettings, saveStoredSettings, saveStoredProducts, saveStoredSubscribers, saveStoredOrders, clearDeletedProducts } from '@/lib/storage';
import { INITIAL_PRODUCTS, INITIAL_SUBSCRIBERS, INITIAL_ORDERS, DEFAULT_SETTINGS } from '@/lib/data';
import { BoutiqueSettings } from '@/lib/types';
import { Settings, Save, Check, RotateCcw, ShieldCheck, Phone, DollarSign, Truck, MapPin, Mail } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function AdminSettingsPage() {
  const { refreshSettings, showToast } = useCart();
  const [settings, setSettings] = useState<BoutiqueSettings>(DEFAULT_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loaded = getStoredSettings();
    setSettings({
      ...DEFAULT_SETTINGS,
      ...loaded,
      admin_username: loaded.admin_username ?? DEFAULT_SETTINGS.admin_username,
      admin_password: loaded.admin_password ?? DEFAULT_SETTINGS.admin_password,
      admin_recovery_email: loaded.admin_recovery_email ?? loaded.admin_username ?? DEFAULT_SETTINGS.admin_recovery_email,
    });
  }, []);


  const handleChange = (field: keyof BoutiqueSettings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveStoredSettings(settings);
    refreshSettings();
    setIsSaved(true);
    showToast('Settings Saved', 'Boutique configuration and payment options updated.', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };


  const handleResetDefaults = () => {
    if (confirm('Reset sample products, subscribers, and settings back to factory demo defaults?')) {
      clearDeletedProducts();
      saveStoredProducts(INITIAL_PRODUCTS);
      saveStoredSubscribers(INITIAL_SUBSCRIBERS);
      saveStoredOrders(INITIAL_ORDERS);
      saveStoredSettings(DEFAULT_SETTINGS);
      setSettings(DEFAULT_SETTINGS);
      refreshSettings();
      showToast('Reset Complete', 'Demo data re-seeded.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Boutique Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure your brand identity, WhatsApp admin dispatch phone, and Sierra Leone mobile money accounts
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Demo Data</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Details */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#c5a059]" />
            <span>Brand Identity &amp; Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Boutique Brand Name
              </label>
              <input
                type="text"
                value={settings.brand_name}
                onChange={(e) => handleChange('brand_name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Showroom Address &bull; Freetown
              </label>
              <input
                type="text"
                value={settings.store_address}
                onChange={(e) => handleChange('store_address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Mobile Money Accounts */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp &amp; Mobile Money Cashout Configuration</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Admin WhatsApp Direct Order Phone (International, no +)
              </label>
              <input
                type="text"
                value={settings.admin_whatsapp}
                onChange={(e) => handleChange('admin_whatsapp', e.target.value)}
                placeholder="23276889900"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#c5a059]"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Customers will be routed to https://wa.me/{settings.admin_whatsapp} with auto-compiled order breakdowns.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                WhatsApp VIP Group Invite Link
              </label>
              <input
                type="text"
                value={settings.whatsapp_group_link || ''}
                onChange={(e) => handleChange('whatsapp_group_link', e.target.value)}
                placeholder="https://chat.whatsapp.com/LumiereVIPClubDemo"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#c5a059]"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                New VIP subscribers will automatically get a 1-click button to join this WhatsApp Group.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Orange Money */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-[#ff7900]/30 space-y-3">
                <span className="text-xs font-bold text-orange-950 block uppercase">
                  Orange Money Merchant Settings
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Cashout Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.orange_money_number}
                    onChange={(e) => handleChange('orange_money_number', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-orange-200 text-xs font-mono text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Merchant Till / Code ID
                  </label>
                  <input
                    type="text"
                    value={settings.orange_money_merchant_id}
                    onChange={(e) => handleChange('orange_money_merchant_id', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-orange-200 text-xs font-mono text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    USSD Code Format ({`{MERCHANT_ID}`}, {`{AMOUNT}`})
                  </label>
                  <input
                    type="text"
                    value={settings.orange_money_ussd_template || '*144*3*{MERCHANT_ID}*{AMOUNT}#'}
                    onChange={(e) => handleChange('orange_money_ussd_template', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-orange-200 text-xs font-mono text-stone-900"
                  />
                </div>
              </div>

              {/* AfriMoney */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-[#e20613]/30 space-y-3">
                <span className="text-xs font-bold text-rose-950 block uppercase">
                  AfriMoney Merchant Settings
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Cashout Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.afrimoney_number}
                    onChange={(e) => handleChange('afrimoney_number', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 text-xs font-mono text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Merchant Till / Code ID
                  </label>
                  <input
                    type="text"
                    value={settings.afrimoney_merchant_id}
                    onChange={(e) => handleChange('afrimoney_merchant_id', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 text-xs font-mono text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    USSD Code Format ({`{MERCHANT_ID}`}, {`{AMOUNT}`})
                  </label>
                  <input
                    type="text"
                    value={settings.afrimoney_ussd_template || '*161*2*{MERCHANT_ID}*{AMOUNT}#'}
                    onChange={(e) => handleChange('afrimoney_ussd_template', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 text-xs font-mono text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Demo Showcase Toggle */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-950 block uppercase">
                  Live Client Demo &amp; Showcase Mode
                </span>
                <span className="text-[11px] text-amber-800">
                  Displays demo payment helper badges and client handoff indicators on the live site.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.demo_mode_enabled ?? true}
                  onChange={(e) => handleChange('demo_mode_enabled', e.target.checked ? 1 : 0)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Admin Credentials & Security */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>Admin Access Credentials &amp; Security</span>
          </h3>
          <p className="text-xs text-stone-500">
            Change the Username/Email and Password used to log into the Admin Portal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Admin Username / Login Email
              </label>
              <input
                type="text"
                value={settings.admin_username ?? ''}
                onChange={(e) => handleChange('admin_username', e.target.value)}
                placeholder="admin@boutique.sl"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Admin Secret Password
              </label>
              <input
                type="text"
                value={settings.admin_password ?? ''}
                onChange={(e) => handleChange('admin_password', e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Password Recovery Email
              </label>
              <input
                type="email"
                value={settings.admin_recovery_email ?? ''}
                onChange={(e) => handleChange('admin_recovery_email', e.target.value)}
                placeholder="owner@boutique.sl"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>
          </div>
          <span className="text-[11px] text-stone-400 block mt-1">
            If you click &quot;Forgot Password?&quot; on the login page, a 6-digit verification reset PIN will be emailed to your Password Recovery Email.
          </span>
        </div>




        {/* Currency & Delivery Thresholds */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#c5a059]" />
            <span>Delivery &amp; Currency Thresholds (SLE)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Standard Freetown Delivery Fee (SLE)
              </label>
              <input
                type="number"
                value={settings.delivery_fee}
                onChange={(e) => handleChange('delivery_fee', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Free Delivery Threshold (SLE)
              </label>
              <input
                type="number"
                value={settings.free_delivery_threshold}
                onChange={(e) => handleChange('free_delivery_threshold', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#18161b] hover:bg-[#c5a059] text-white hover:text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98 cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Settings Saved Successfully!' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
