import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Countries App',
  description:
    'Countries search with map pin. Web app developed in Next.js & Typescript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.className} flex flex-col`}>
        <Header />
        <main className="flex-1 flex flex-col mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
