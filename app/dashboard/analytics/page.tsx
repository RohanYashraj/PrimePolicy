"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-none border border-border bg-foreground/5 p-8">
        <BarChart3 className="mx-auto h-12 w-12 text-muted animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold tracking-tighter uppercase">Analytics Engine</h2>
      <p className="mt-4 max-w-md text-sm font-medium uppercase tracking-widest text-muted leading-relaxed">
        Real-time risk telemetry and agent performance metrics coming soon.
      </p>
      <div className="mt-12 grid grid-cols-3 gap-2">
         {[1, 2, 3].map(i => (
           <div key={i} className="h-8 w-1 bg-accent/20">
              <div className="h-full w-full bg-accent/60 scale-y-0 origin-bottom animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
           </div>
         ))}
      </div>
    </div>
  );
}
