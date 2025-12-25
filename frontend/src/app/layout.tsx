import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityButton } from "@/components/molecules/AccessibilityButton/AccessibilityButton";
import { ThemeButton } from "@/components/atoms/ThemeButton/ThemeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Gazeta News - Notícias Atualizadas",
    template: "%s | Gazeta News",
  },
  description:
    "Fique por dentro das últimas notícias com a Gazeta News - sua fonte confiável para informações atualizadas e análises aprofundadas sobre os principais acontecimentos locais, nacionais e internacionais.",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Gazeta News',
    title: 'Gazeta News - Notícias Atualizadas',
    description: 'Sua fonte confiável para informações atualizadas sobre os principais acontecimentos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gazeta News',
    description: 'Notícias atualizadas e confiáveis',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AccessibilityProvider>
            <AccessibilityButton />
            <ThemeButton />
            {children}
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
