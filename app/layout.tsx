import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flash BotEditor – Manage Your Telegram Bot",
  description:
    "Flash BotEditor lets you fetch and update your Telegram Bot's name, description, and short description instantly. Professional bot management made simple.",
  keywords: [
    "Telegram Bot Editor",
    "Telegram Bot Manager",
    "Edit Telegram Bot",
    "Bot Token",
    "Flash BotEditor",
  ],
  authors: [{ name: "Flash BotEditor" }],
  creator: "Flash BotEditor",
  publisher: "Flash BotEditor",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Flash-boteditor.vercel.app",
    siteName: "Flash BotEditor",
    title: "Flash BotEditor – Manage Your Telegram Bot",
    description:
      "Fetch and update your Telegram Bot information instantly. Professional bot management made simple.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flash BotEditor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash BotEditor – Manage Your Telegram Bot",
    description:
      "Fetch and update your Telegram Bot information instantly. Professional bot management made simple.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-brand-text`}
      >
        {children}
      </body>
    </html>
  );
}
