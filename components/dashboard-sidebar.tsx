"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ReceiptText, BarChart3, Plus, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Policy Queue", href: "/dashboard/policy-queue", icon: ReceiptText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-border bg-background/50 backdrop-blur-xl">
      <div className="flex h-full flex-col p-6">
        {/* Brand */}
        <Link href="/dashboard" className="mb-12 flex items-center gap-3 active:scale-95 transition-transform">
          <div className="h-8 w-8 bg-accent flex items-center justify-center">
             <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter uppercase">PrimePolicy</span>
        </Link>

        {/* Action */}
        <Link 
          href="/dashboard/create-policy"
          className="group mb-12 flex h-14 items-center justify-center gap-3 bg-foreground p-1 text-sm font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/90 active:scale-95"
        >
          <div className="flex items-center gap-2 border border-background/20 px-4 py-2 w-full h-full justify-center">
            <Plus className="h-4 w-4" />
            Create New Policy
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 px-4 py-3 text-sm font-medium uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-foreground/5 text-foreground border-r-2 border-accent" 
                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-border pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative h-10 w-10 overflow-hidden ring-1 ring-border">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarContainer: "rounded-none",
                      userButtonTrigger: "rounded-none h-10 w-10",
                    }
                  }}
                  afterSignOutUrl="/" 
                />
             </div>
             <div className="hidden flex-col sm:flex">
                <span className="text-xs font-bold uppercase tracking-widest leading-tight">{user?.firstName || "Admin"}</span>
                <span className="text-[10px] text-muted font-mono">Underwriter</span>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
