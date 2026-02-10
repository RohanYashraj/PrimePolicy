import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <header className="mb-12 flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Dashboard</h1>
          <p className="mt-2 text-muted uppercase tracking-widest text-xs font-bold">Policy Administration System POC</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors">Back to Home</a>
          <UserButton afterSignOutUrl="/" />
          <ThemeToggle />
        </div>
      </header>

      <main className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Policies", value: "1,284", change: "+12%" },
          { label: "Pending Claims", value: "43", change: "-5%" },
          { label: "Agent Uptime", value: "99.99%", change: "Stable" },
          { label: "Underwriting Queue", value: "12", change: "Fast" }
        ].map((stat, i) => (
          <div key={i} className="border border-border p-6 bg-foreground/5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{stat.label}</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tighter">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-accent' : 'text-muted'}`}>{stat.change}</span>
            </div>
          </div>
        ))}

        <div className="col-span-full mt-8 border border-border p-8 bg-foreground/5 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 bg-accent animate-pulse" />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted">Agent Output Visualizer (Placeholder)</p>
          </div>
        </div>
      </main>
    </div>
  );
}
