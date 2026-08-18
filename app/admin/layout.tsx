'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isUserAdminAuthenticated } from '@/lib/storage';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // If we're on the login page, don't enforce auth guard
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const isAuth = isUserAdminAuthenticated();
    if (!isAuth) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#121013] flex items-center justify-center text-[#f5ebd7]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono tracking-widest uppercase">Checking Admin Credentials...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
