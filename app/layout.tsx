// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energy Coach",
  description: "你的每日能量管理教練，在最需要的時候給你溫暖小語。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
