"use client";

import { useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const { user } = useUser();
  
  // Map pathname to title
  const getTitle = (path: string) => {
    if (path === "/dashboard") return "Dashboard";
    if (path === "/dashboard/policy-queue") return "Policy Queue";
    if (path === "/dashboard/analytics") return "Analytics";
    if (path.includes("create-policy")) return "Issue New Policy";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border bg-background/50 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight uppercase">{getTitle(pathname)}</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          Welcome back, <span className="text-foreground">{user?.firstName || "Administrator"}</span>
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-none border border-border bg-foreground/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted group hover:border-accent/40 transition-colors cursor-default">
           <span className="h-1.5 w-1.5 animate-pulse bg-accent" />
           System Online: 99.9%
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
