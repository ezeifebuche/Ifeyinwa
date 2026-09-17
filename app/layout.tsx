import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import localFont from "next/font/local";

const playfair = localFont({
  src: [
    { path: "./fonts/PlayfairDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/PlayfairDisplay-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/PlayfairDisplay-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/PlayfairDisplay-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-playfair",
});

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
});

// TODO: replace with the real domain once confirmed (Scope doc §10, Q11)
const SITE_URL = "https://ifeyinwa.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ifeyinwa — Create. Empower. Inspire.",
    template: "%s | Ifeyinwa",
  },
  description:
    "Movies. Learning. Creators. Community. Learn AI video production, get hired through our creator agency, and watch our original work — all in one place.",
  keywords: [
    "AI video training",
    "AI video academy Nigeria",
    "hire AI video creator",
    "Ifeyinwa",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Ifeyinwa",
    title: "Ifeyinwa — Create. Empower. Inspire.",
    description: "Movies. Learning. Creators. Community. All in one place.",
    images: [
      {
        url: "/og-image.jpg", // TODO: swap in the real 1200x630 share image
        width: 1200,
        height: 630,
        alt: "Ifeyinwa — Create. Empower. Inspire.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifeyinwa — Create. Empower. Inspire.",
    description: "Movies. Learning. Creators. Community. All in one place.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070506",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-body`}>
        {children}
        <WhatsAppFloat />
        <CookieBanner />

        {/* Plausible — privacy-friendly, no cookie banner required for analytics itself.
            Swap for GA4's gtag.js here if the client prefers Google Analytics instead. */}
        <Script
          defer
          data-domain="ifeyinwa.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
