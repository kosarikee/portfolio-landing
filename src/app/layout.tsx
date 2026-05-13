import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Эрик | IT-решения для дома",
  description:
    "Помогаю частным клиентам с умным домом, видеонаблюдением, настройкой сетей и компьютеров. Индивидуальный подход и гарантия результата.",
  keywords: [
    "умный дом",
    "видеонаблюдение",
    "настройка WiFi",
    "Mesh сеть",
    "сборка ПК",
    "Telegram бот",
    "IT специалист на дом",
    "компьютерная помощь",
    "настройка роутера",
    "домашняя сеть",
    "NVR",
    "Видеокамеры",
  ],
  authors: [{ name: "Эрик" }],
  openGraph: {
    title: "Эрик | Надежные IT-решения для вашего дома",
    description:
      "Умный дом, видеонаблюдение, сети и компьютеры. Помогаю сделать ваш дом технологичнее и безопаснее.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
