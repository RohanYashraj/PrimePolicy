import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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

export const metadata: Metadata = {
  title: "PrimePolicy | Agentic Policy Admin",
  description: "Next-generation Policy Administration System powered by Sovereign Agentic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#E11D48", // Crimson accent
          colorBackground: "#0A0A0A",
          colorInputBackground: "#121212",
          colorInputText: "#FAFAFA",
          borderRadius: "0px", // Industrial/Brutalist sharp corners
        },
        elements: {
          card: "border border-white/5 bg-black/50 backdrop-blur-xl",
          headerTitle: "tracking-tighter uppercase font-bold text-xl",
          headerSubtitle: "text-muted tracking-widest uppercase text-[10px]",
          socialButtonsBlockButton: "rounded-none border-white/10 hover:bg-white/5",
          formButtonPrimary: "rounded-none bg-accent hover:bg-accent/90 text-xs font-bold uppercase tracking-widest",
          footerActionLink: "text-accent hover:text-accent/80",
        }
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
