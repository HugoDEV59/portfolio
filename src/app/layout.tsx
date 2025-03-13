import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from '@vercel/analytics/react';

// Configuration des polices
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Métadonnées du site
export const metadata: Metadata = {
  title: "Portfolio Développeur Web | Geek & Professionnel",
  description: "Portfolio de développeur web avec un design geek, interactif et professionnel. Découvrez mes projets, compétences et expériences.",
  keywords: "développeur web, portfolio, react, next.js, frontend, backend, fullstack, développeur javascript, développeur react",
  authors: [{ name: "Votre Nom" }],
  creator: "Votre Nom",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-domaine.com',
    title: 'Portfolio Développeur Web | Geek & Professionnel',
    description: 'Portfolio de développeur web avec un design geek, interactif et professionnel. Découvrez mes projets, compétences et expériences.',
    siteName: 'Portfolio Développeur Web',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Développeur Web | Geek & Professionnel',
    description: 'Portfolio de développeur web avec un design geek, interactif et professionnel. Découvrez mes projets, compétences et expériences.',
    creator: '@votretwitter',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-darker text-light min-h-screen flex flex-col`}
      >
        {/* Éléments de fond */}
        <div className="cyber-grid"></div>
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-darker via-dark to-black opacity-90"></div>
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)' 
        }}></div>
        
        {/* Éléments lumineux */}
        <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-neon-blue/5 via-transparent to-transparent blur-3xl z-0"></div>
        <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-3xl z-0"></div>
        
        {/* Structure principale */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow pt-20 relative">
            {children}
          </main>
          
          <Footer />
        </div>
        
        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
