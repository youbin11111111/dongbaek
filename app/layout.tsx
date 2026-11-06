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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "bLOOM | 동백마을 × A20 Lite",
  description: "동백숲의 이야기가 당신의 일상에 피어납니다. 백송이와 함께 만나는 동백마을 × A20 Lite 콜라보 컬렉션.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "bLOOM",
    title: "bLOOM | 동백마을 × A20 Lite",
    description: "동백숲의 이야기가 당신의 일상에 피어납니다. 백송이와 함께 만나는 동백마을 × A20 Lite 콜라보 컬렉션.",
  },
  twitter: {
    card: "summary_large_image",
    title: "bLOOM | 동백마을 × A20 Lite",
    description: "동백숲의 이야기가 당신의 일상에 피어납니다. 동백마을 × A20 Lite 콜라보 컬렉션.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}


