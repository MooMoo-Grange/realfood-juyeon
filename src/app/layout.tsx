import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://realfood-juyeon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "리얼푸드 주연 — 진짜 음식이 진짜 건강입니다",
  description:
    "주연이 전하는 리얼푸드 가이드. 초가공식품 OUT, 리얼푸드 IN. 해발 1,000m 삼수령 무무목장에서 전하는 진짜 음식 이야기.",
  keywords: "리얼푸드, 초가공식품, 진짜음식, A2우유, 건강밥상, 아이간식, 제철식재료, 무무목장",
  openGraph: {
    title: "리얼푸드 주연 — 진짜 음식이 진짜 건강입니다",
    description: "해발 1,000m 목장에서 전하는 진짜 음식 이야기. 초가공식품 OUT, 리얼푸드 IN!",
    url: siteUrl,
    siteName: "리얼푸드 주연",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "리얼푸드 주연 — 진짜 음식이 진짜 건강입니다",
    description: "해발 1,000m 목장에서 전하는 진짜 음식 이야기",
  },
  other: {
    "naver-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
