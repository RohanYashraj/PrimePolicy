import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-accent" />
          <span className="text-xl font-bold tracking-tighter uppercase">PrimePolicy</span>
        </div>
        <div className="flex items-center gap-6">
          <SignedOut>
            <div className="hidden items-center gap-8 text-sm font-medium uppercase tracking-widest text-muted sm:flex">
              <a href="/sign-in" className="transition-colors hover:text-foreground">Sign In</a>
            </div>
            <a href="/sign-up" className="rounded-none border border-foreground/20 bg-foreground/5 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background">
              Get Started
            </a>
          </SignedOut>
          <SignedIn>
            <a href="/dashboard" className="text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground">Dashboard</a>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-32">
        <section className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Agentic Intelligence</span>
          </div>
          
          <h1 className="text-balance text-6xl font-bold leading-[1.1] tracking-tighter sm:text-8xl">
            Policy Administration <br />
            <span className="text-muted">Reimagined by Agents.</span>
          </h1>
          
          <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            PrimePolicy is a high-craft Policy Admin System POC. We leverage sovereign AI agents to automate complex underwriting, claims processing, and policy lifecycle management with industrial precision.
          </p>

          <div className="mt-16 flex flex-wrap gap-6">
            <button className="group flex h-14 items-center gap-4 bg-accent px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:bg-accent/90">
              Launch Prototype
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M9.75 4.5L14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="flex h-14 items-center gap-4 border border-foreground/20 bg-transparent px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-foreground/5">
              View Architecture
            </button>
          </div>
        </section>

        {/* Agent Activity Ticker */}
        <section className="mt-32 border-t border-border pt-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Active Node: PAS-AGENT-01</h2>
              <div className="mt-2 flex items-center gap-3 text-2xl font-mono tracking-tight">
                <span className="h-2 w-2 animate-pulse bg-accent" />
                Processing Underwriting Queue...
              </div>
            </div>
            <div className="flex gap-12 font-mono text-xs uppercase tracking-widest text-muted">
              <div>
                <span className="block text-foreground">Efficiency</span>
                <span>+42.8%</span>
              </div>
              <div>
                <span className="block text-foreground">Latency</span>
                <span>12ms</span>
              </div>
              <div>
                <span className="block text-foreground">Accuracy</span>
                <span>99.98%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mt-32 grid gap-12 sm:grid-cols-3">
          {[
            { title: "Autonomous Underwriting", desc: "Agents evaluate risks in real-time, accessing thousands of data points to deliver instant decisions." },
            { title: "Sovereign Claims", desc: "End-to-end claims resolution without manual intervention, powered by verifiable logic chains." },
            { title: "Dynamic Product Engine", desc: "Launch new insurance products in hours, not months, using agent-driven schema generation." }
          ].map((feature, i) => (
            <div key={i} className="group relative border border-border p-8 transition-colors hover:border-accent/20">
              <div className="mb-6 h-8 w-8 bg-foreground/5 p-1.5 transition-colors group-hover:bg-accent/10">
                <div className="h-full w-full border border-border group-hover:border-accent/40" />
              </div>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{feature.desc}</p>
            </div>
          ))}
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
