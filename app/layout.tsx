import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/store';
import ToastContainer from '@/components/Toast';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#121013',
};

export const metadata: Metadata = {
  title: "Maison Lumière | Luxury Women's Boutique & Cosmetics Freetown",
  description: "Curated women's fashion gowns, silk couture, and 24K radiance cosmetics in Sierra Leone. Order with instant WhatsApp checkout & Orange Money / AfriMoney in SLE.",
  keywords: "Sierra Leone boutique, Freetown fashion, women dresses, cosmetics Freetown, Leone SLE clothing, Orange Money shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Alibaba.com Official Typography: Roboto, Open Sans & Alibaba Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-stone-900 font-sans antialiased selection:bg-[#c5a059]/30 selection:text-stone-900">
        <CartProvider>
          {children}
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
