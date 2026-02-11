"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ReceiptText, BarChart3, Plus, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Policy Queue", href: "/dashboard/policy-queue", icon: ReceiptText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const initializePolicy = useMutation(api.policies.initializePolicy);

  const handleCreateNew = async () => {
    if (!user) return;
    try {
      const id = await initializePolicy({ createdBy: user.id });
      router.push(`/dashboard/create-policy/step-1-intake?id=${id}`);
    } catch (error) {
      console.error("Failed to initialize policy:", error);
    }
  };

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
        <button 
          onClick={handleCreateNew}
          className="group mb-12 flex h-14 items-center justify-start gap-3 bg-foreground p-1 text-sm font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/90 active:scale-95 w-full"
        >
          <div className="flex items-center gap-2 border border-background/20 px-4 py-2 w-full h-full justify-start whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Issue new policy
          </div>
        </button>

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
        <div className="mt-auto border-t border-border pt-6 flex items-center justify-start">
          <div className="flex items-center gap-2">
             <div className="relative flex h-10 w-10 items-center justify-center">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarContainer: "rounded-none",
                      userButtonTrigger: "rounded-none h-10 w-10 flex items-center justify-center",
                      userButtonAvatarBox: "h-10 w-10"
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
