// app/layout.tsx
import type { Metadata } from 'next';
import { Libre_Franklin, Fjalla_One } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
const sans = Libre_Franklin({ subsets: ['latin'], variable: '--font-sans' });
const display = Fjalla_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Cosmic Blocks',
  description: 'Build content-powered websites and apps faster with Cosmic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${display.variable} ${sans.variable} font-sans p-4 md:p-0 bg-white dark:bg-black`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
