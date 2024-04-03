// app/layout.tsx
import type { Metadata } from "next";
import { Libre_Franklin, Fjalla_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/cosmic/blocks/ecommerce/CartProvider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Banner from "@/components/Banner";
import { Suspense } from "react";

const sans = Libre_Franklin({ subsets: ["latin"], variable: "--font-sans" });
const display = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "ProLine Content Corps - Agency website template by Cosmic",
  description: "A Cosmic template built with Blocks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} font-sans md:p-0 bg-white dark:bg-black h-dvh w-full`}
      >
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <div>
                <Banner />
                <Header />
                {children}
              </div>
              <Footer />
            </CartProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
