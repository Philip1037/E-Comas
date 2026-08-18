'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { setAdminAuthenticated } from '@/lib/storage';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
  Store,
  Menu,
  X,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Inventory & Drops', href: '/admin/products', icon: Package },
    { label: 'VIP Subscriber CRM', href: '/admin/subscribers', icon: Users },
    { label: 'Order Leads', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Boutique Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top App Bar for Admin (screens < md) */}
      <div className="md:hidden bg-[#141216] border-b border-stone-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 text-stone-200">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#c5a059] text-black font-bold font-serif text-sm flex items-center justify-center">
            ML
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-wider text-[#f5ebd7] block">
              MAISON LUMIÈRE
            </span>
            <span className="text-[9px] tracking-widest text-[#c5a059] uppercase font-semibold">
              Admin Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-white/5 text-[#c5a059] hover:bg-white/10 text-xs"
            title="Open Storefront"
          >
            <Store className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg bg-white/5 text-stone-300 hover:text-white"
            aria-label="Toggle Admin Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        />
      )}

      {/* Sidebar (Desktop sticky & Mobile sliding drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-auto w-72 md:w-64 bg-[#141216] text-stone-300 flex flex-col justify-between border-r border-stone-800 shrink-0 h-screen transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Brand */}
        <div>
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="block">
              <span className="font-serif text-lg font-bold tracking-widest text-[#f5ebd7] block">
                MAISON LUMIÈRE
              </span>
              <span className="text-[10px] tracking-widest text-[#c5a059] uppercase font-semibold">
                Admin &bull; CRM Portal
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#c5a059] text-stone-950 font-bold shadow-lg shadow-[#c5a059]/20'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            onClick={() => setAdminAuthenticated(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-stone-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#c5a059]" />
              <span>View Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </Link>


          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
