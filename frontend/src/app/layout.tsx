import type { Metadata } from "next";
import "./globals.scss";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityButton } from "@/components/atoms/AccessibilityButton/AccessibilityButton";
import { ThemeButton } from "@/components/atoms/ThemeButton/ThemeButton";
import { ErrorBoundary, SITE_CONFIG, OPEN_GRAPH_CONFIG, TWITTER_CONFIG } from "@/lib";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: OPEN_GRAPH_CONFIG,
  twitter: TWITTER_CONFIG,
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
            <ErrorBoundary>
              <AccessibilityButton />
              <ThemeButton />
              {children}
            </ErrorBoundary>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
