import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export const metadata: Metadata = {
  title: {
    default: "PrimePolicy | AI-Driven Policy Administration System",
    template: "%s | PrimePolicy"
  },
  description: "Automate the entire insurance lifecycle with PrimePolicy. Powered by sovereign AI agents for precision underwriting, claims processing, and real-time compliance.",
  keywords: ["AI Policy Admin", "Agentic AI Insurance", "InsurTech Automation", "Autonomous Underwriting", "PrimePolicy"],
  authors: [{ name: "PrimePolicy Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primepolicy.vercel.app",
    title: "PrimePolicy | Next-Gen AI Policy Administration",
    description: "Experience the future of InsurTech. Autonomous agents, instant decisions, global scale.",
    siteName: "PrimePolicy",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimePolicy | Agentic AI Insurance",
    description: "Policy Administration reimagined by autonomous agents.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
