import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Usando a fonte Inter (padrão)
import "./globals.css";

// 👇 O SEGREDO ESTÁ AQUI: display: 'swap'
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Inscrição Invasores",
  description: "Treino Aberto Invasores 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}