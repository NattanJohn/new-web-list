import type { Metadata } from "next";
import "./globals.scss";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityButton } from "@/components/molecules/AccessibilityButton/AccessibilityButton";
import { ThemeButton } from "@/components/atoms/ThemeButton/ThemeButton";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialTheme: 'light' | 'dark' | undefined;
  try {
    const cookieStore = typeof cookies === 'function' ? await cookies() : undefined;
    const cookieValue = cookieStore?.get ? cookieStore.get('gazeta-theme')?.value : undefined;
    initialTheme = cookieValue === 'dark' ? 'dark' : cookieValue === 'light' ? 'light' : undefined;
  } catch {
    initialTheme = undefined;
  }

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${inter.className}`}
      data-theme={initialTheme}
      style={initialTheme ? { backgroundColor: initialTheme === 'dark' ? '#121212' : '#ffffff' } : undefined}
    >
      <head>
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider initialTheme={initialTheme}>
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
