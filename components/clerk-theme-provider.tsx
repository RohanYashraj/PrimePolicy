"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  // Use resolvedTheme to handle "system" mode as well
  const currentTheme = mounted ? (resolvedTheme === "dark" ? dark : undefined) : undefined;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: currentTheme,
        variables: {
          colorPrimary: "#E11D48",
          borderRadius: "0px",
        },
        elements: {
          card: "border border-border bg-background/50 backdrop-blur-xl",
          headerTitle: "tracking-tighter uppercase font-bold text-xl",
          headerSubtitle: "text-muted tracking-widest uppercase text-[10px]",
          socialButtonsBlockButton: "rounded-none border-border hover:bg-foreground/5",
          formButtonPrimary: "rounded-none bg-accent hover:bg-accent/90 text-xs font-bold uppercase tracking-widest",
          footerActionLink: "text-accent hover:text-accent/80",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
