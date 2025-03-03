import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/globals.css";

// Noto Sans JP フォントの設定
const noto = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReviewHub",
  description: "ReviewHub は、エンジニアのためのコードレビューサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.className} antialiased`}>{children}</body>
    </html>
  );
}
