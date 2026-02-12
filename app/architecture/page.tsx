import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Database, TrendingUp, FileCheck, Clock, Brain, Lock, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Architecture | PrimePolicy",
  description: "Discover the agentic architecture powering PrimePolicy - the next-generation Policy Admin System built for actuarial precision.",
};

export default function ArchitecturePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 bg-accent" />
          <span className="text-xl font-bold tracking-tighter uppercase">PrimePolicy</span>
        </Link>
        <div className="flex items-center gap-6">
          <SignedOut>
            <div className="hidden items-center gap-8 text-sm font-medium uppercase tracking-widest text-muted sm:flex">
              <Link href="/sign-in" className="transition-colors hover:text-foreground">Sign In</Link>
            </div>
            <Link href="/sign-up" className="rounded-none border border-foreground/20 bg-foreground/5 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background">
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-32">
        <section className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">System Architecture</span>
          </div>
          
          <h1 className="text-balance text-6xl font-bold leading-[1.1] tracking-tighter sm:text-8xl">
            Industrial-Grade <br />
            <span className="text-muted">Agentic PAS.</span>
          </h1>
          
          <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            PrimePolicy is the first Policy Admin System designed from the ground up for autonomous operation. 
            Built on event-driven architecture with real-time actuarial computation engines and sovereign AI agents.
          </p>
        </section>

        {/* Key Differentiators */}
        <section className="mt-32 border-t border-border pt-12">
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Competitive Edge</h2>
            <div className="mt-2 text-2xl font-bold uppercase tracking-tight">Why PrimePolicy Outperforms Legacy PAS</div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: Brain, 
                title: "Agentic Intelligence", 
                legacy: "Manual underwriting workflows",
                prime: "Autonomous agents evaluate 10,000+ data points in <2s"
              },
              { 
                icon: Clock, 
                title: "Real-Time Pricing", 
                legacy: "Batch processing (24-48hr turnaround)",
                prime: "Live premium calculation with dynamic risk scoring"
              },
              { 
                icon: Workflow, 
                title: "Zero-Code Products", 
                legacy: "6-12 months to launch new products",
                prime: "Deploy new insurance products in hours via schema generation"
              },
              { 
                icon: TrendingUp, 
                title: "Predictive Analytics", 
                legacy: "Retrospective reporting only",
                prime: "Forward-looking risk models with ML-driven forecasts"
              },
              { 
                icon: Lock, 
                title: "Sovereign Data", 
                legacy: "Centralized vendor lock-in",
                prime: "Self-hosted Convex backend with full data sovereignty"
              },
              { 
                icon: FileCheck, 
                title: "Compliance Automation", 
                legacy: "Manual regulatory checks",
                prime: "Embedded compliance engine validates every transaction"
              }
            ].map((diff, i) => (
              <div key={i} className="group relative border border-border p-6 transition-colors hover:border-accent/20">
                <diff.icon className="mb-4 h-6 w-6 text-accent" />
                <h3 className="mb-3 text-sm font-bold uppercase tracking-tight">{diff.title}</h3>
                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="text-muted">
                    <span className="font-mono uppercase tracking-wider">Legacy:</span> {diff.legacy}
                  </div>
                  <div className="text-foreground">
                    <span className="font-mono uppercase tracking-wider text-accent">Prime:</span> {diff.prime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="mt-32">
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Complete Feature Set</h2>
            <div className="mt-2 text-2xl font-bold uppercase tracking-tight">End-to-End Policy Lifecycle Management</div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            <div className="space-y-8">
              <div className="group relative border border-border p-8 transition-colors hover:border-accent/20">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Intelligent Underwriting</h3>
                    <p className="text-sm font-mono text-muted">Risk Assessment Engine</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>• Multi-factor risk scoring (smoking, medical history, lifestyle)</li>
                  <li>• Automated KYC verification with Aadhaar/PAN integration</li>
                  <li>• Document intelligence for policy document extraction</li>
                  <li>• Accept/Reject/Refer decisioning with audit trails</li>
                </ul>
              </div>

              <div className="group relative border border-border p-8 transition-colors hover:border-accent/20">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Dynamic Pricing</h3>
                    <p className="text-sm font-mono text-muted">Actuarial Computation</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>• Real-time premium calculation based on sum assured</li>
                  <li>• Risk-adjusted pricing with mortality table integration</li>
                  <li>• Multi-currency support (₹ INR primary)</li>
                  <li>• Transparent underwriting notes for auditors</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group relative border border-border p-8 transition-colors hover:border-accent/20">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                    <Database className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Policy Lifecycle</h3>
                    <p className="text-sm font-mono text-muted">State Management</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>• 6-step policy creation workflow (Client → Issuance)</li>
                  <li>• Status tracking: Quote → Review → Approved → Issued</li>
                  <li>• Nominee management with relationship validation</li>
                  <li>• Policy queue dashboard with real-time updates</li>
                </ul>
              </div>

              <div className="group relative border border-border p-8 transition-colors hover:border-accent/20">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Tech Stack</h3>
                    <p className="text-sm font-mono text-muted">Modern Infrastructure</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>• Next.js 15 + React 19 (App Router, Server Components)</li>
                  <li>• Convex real-time database with ACID compliance</li>
                  <li>• Clerk authentication with RBAC</li>
                  <li>• Tailwind CSS 4 + Framer Motion for premium UX</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Actuarial Metrics */}
        <section className="mt-32 border-t border-border pt-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Performance Benchmarks</h2>
              <div className="mt-2 flex items-center gap-3 text-2xl font-mono tracking-tight">
                <span className="h-2 w-2 animate-pulse bg-accent" />
                Production-Grade Metrics
              </div>
            </div>
            <div className="flex gap-12 font-mono text-xs uppercase tracking-widest text-muted">
              <div>
                <span className="block text-foreground">Underwriting Speed</span>
                <span>&lt;2 seconds</span>
              </div>
              <div>
                <span className="block text-foreground">Data Points</span>
                <span>10,000+</span>
              </div>
              <div>
                <span className="block text-foreground">Accuracy</span>
                <span>99.98%</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl border-t border-border px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">
            © 2026 PrimePolicy. Built for the future of PAS.
          </span>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted">
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </footer>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--grid-color)_1px,transparent_1px)] [background-size:40px_40px]" />
    </div>
  );
}
