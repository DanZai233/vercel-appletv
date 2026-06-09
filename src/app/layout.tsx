import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vercel-appletv.vercel.app"),
  title: "AniDeck",
  description: "Apple TV 风格的二次元资讯与番剧来源聚合站。",
  openGraph: {
    title: "AniDeck",
    description: "Apple TV 风格的二次元资讯与番剧来源聚合站。",
    siteName: "AniDeck",
    type: "website",
    url: "https://vercel-appletv.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
