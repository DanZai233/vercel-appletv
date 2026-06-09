import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
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
  title: SITE.name,
  description: "Apple TV 风格的二次元资讯与番剧来源聚合站。",
  authors: [
    {
      name: SITE.authorName,
      url: SITE.authorUrl,
    },
  ],
  creator: SITE.authorName,
  icons: {
    apple: "/anideck-icon.svg",
    icon: "/anideck-icon.svg",
    shortcut: "/anideck-icon.svg",
  },
  openGraph: {
    title: SITE.name,
    description: "Apple TV 风格的二次元资讯与番剧来源聚合站。",
    siteName: SITE.name,
    type: "website",
    url: "https://vercel-appletv.vercel.app",
  },
  other: {
    "github:repository": SITE.repositoryUrl,
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
