import { ShieldCheck } from "lucide-react";

export default function IssuancePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="mb-8 relative">
        <div className="h-24 w-24 border border-accent flex items-center justify-center relative z-10">
           <ShieldCheck className="h-10 w-10 text-accent animate-pulse" />
        </div>
        <div className="absolute -top-4 -right-4 h-24 w-24 border border-border -z-10" />
      </div>

      <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">Policy Issuance Protocol</h3>
      <p className="text-sm text-muted font-medium uppercase tracking-widest max-w-md leading-relaxed mb-12">
        Final confirmation required before sovereign agent issuance and blockchain record generation.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 text-left max-w-2xl w-full border border-border/40 p-6 bg-foreground/[0.01]">
         {[
           { label: "Policy ID", value: "PAS-77291-B" },
           { label: "Start Date", value: "2026-02-15" },
           { label: "Total Sum Insured", value: "$4,500,000" },
           { label: "Issuing Node", value: "PAS-AGENT-01" }
         ].map((info, i) => (
           <div key={i} className="space-y-1">
             <p className="text-[8px] font-bold uppercase tracking-tighter text-muted">{info.label}</p>
             <p className="text-[10px] font-bold uppercase tracking-widest">{info.value}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
