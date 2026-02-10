"use client";

import { BarChart3, Clock, ShieldCheck, Activity } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Active Policies", value: "1,284", change: "+12.4%", icon: ShieldCheck, color: "text-accent" },
    { label: "Claims Processing", value: "43", change: "-5.2%", icon: Clock, color: "text-muted" },
    { label: "Agent Uptime", value: "99.99%", change: "Stable", icon: Activity, color: "text-accent" },
    { label: "Risk Score Avg", value: "0.12", change: "Fast", icon: BarChart3, color: "text-muted" }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="group relative overflow-hidden border border-border bg-foreground/[0.02] p-6 transition-all hover:bg-foreground/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </span>
              <stat.icon className="h-4 w-4 text-muted/40 group-hover:text-accent transition-colors" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tighter">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute -right-4 -top-4 h-16 w-16 bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-all" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 border border-border bg-foreground/[0.02] p-8 min-h-[400px] flex flex-col">
          <div className="mb-6 flex items-center justify-between">
             <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Agent Activity Stream</h2>
             <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Live</span>
             </div>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-border/40">
            <div className="text-center">
              <Activity className="mx-auto mb-4 h-8 w-8 text-muted animate-pulse" />
              <p className="max-w-[200px] text-[10px] font-bold uppercase tracking-[0.3em] text-muted leading-relaxed">
                Initialising Sovereign Agent Visualisation Node...
              </p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-foreground/[0.02] p-8">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em]">System Alerts</h2>
          <div className="space-y-4">
             {[
               { time: "2m ago", msg: "Underwriting Agent PAS-01 processed Policy #8129", type: "success" },
               { time: "15m ago", msg: "High risk detection in Claims Queue [Region: APAC]", type: "warning" },
               { time: "45m ago", msg: "Knowledge Base update synchronized with Core PAS", type: "info" }
             ].map((alert, i) => (
               <div key={i} className="flex gap-4 border-l-2 border-accent/20 pl-4 py-1">
                 <div className="flex-1">
                   <p className="text-xs font-medium leading-relaxed">{alert.msg}</p>
                   <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{alert.time}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
