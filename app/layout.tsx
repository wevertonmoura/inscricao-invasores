import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

// Configuração da Fonte (Otimizada)
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
  variable: '--font-inter',
});

// --- 🚀 SEO & METADADOS PROFISSIONAIS ---
export const metadata: Metadata = {
  title: "Treinão Invasores 2026 | Inscrição Gratuita",
  description: "Garanta sua vaga no treino de corrida mais energia de Recife. Evento gratuito dia 25/01 em Boa Viagem. Caminhada, 5km e 10km.",
  
  // Palavras-chave para ajudar a achar no Google
  keywords: ["corrida recife", "treino invasores", "corrida de rua", "boa viagem", "evento gratuito", "invasores running"],
  
  authors: [{ name: "Grupo Invasores" }],
  
  // Configuração para quando compartilhar o link no WhatsApp/Instagram
  openGraph: {
    title: "Treinão Invasores 2026 - É Gratuito! 🏃‍♂️💨",
    description: "Bora correr? Garanta sua vaga agora. Dia 25/01 em Boa Viagem.",
    url: "https://treino-gratuito-invasores.vercel.app", // Seu link oficial
    siteName: "Grupo Invasores",
    locale: "pt_BR",
    type: "website",
  },
  
  // Ícone da aba do navegador
  icons: {
    icon: "/icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      {/* Adicionei 'antialiased' para a fonte ficar mais nítida */}
      <body className={`${inter.className} antialiased bg-slate-950 text-slate-200`}>
        {children}
      </body>
    </html>
  );
}