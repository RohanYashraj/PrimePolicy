"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldCheck, Printer, Download, Mail } from "lucide-react";
import { formatINR } from "@/lib/currency-utils";
import { Id } from "@/convex/_generated/dataModel";

export default function IssuancePage() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id") as Id<"policies"> | null;
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId } : "skip"
  );
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12 py-12">
      <div className="relative text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 border border-accent flex items-center justify-center relative">
            <CheckCircle2 className="h-10 w-10 text-accent" />
            <div className="absolute -inset-2 border border-accent/20 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold tracking-tighter uppercase italic">Policy Issued</h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            Policy Successfully Issued: #{existingPolicy?.policyId || "PAS-7709211"}
          </p>
        </div>
      </div>

      <div className="max-w-md w-full border border-border/40 bg-foreground/[0.01] p-10 space-y-8">
        <div className="grid grid-cols-2 gap-8 text-[10px] font-mono uppercase">
          <div className="space-y-1">
            <span className="text-muted/60">Policyholder</span>
            <p className="font-bold text-foreground">{existingPolicy?.clientName || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted/60">Sum Assured</span>
            <p className="font-bold text-foreground">{formatINR(existingPolicy?.sumAssured || 0)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted/60">Premium Mode</span>
            <p className="font-bold text-foreground">Annual</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted/60">Risk Profile</span>
            <p className="font-bold text-foreground uppercase">{existingPolicy?.lifestyleRisk || "Standard"}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 grid grid-cols-3 gap-4">
           {[
             { icon: Printer, label: "Print" },
             { icon: Download, label: "Save" },
             { icon: Mail, label: "Email" }
           ].map((action, i) => (
             <button key={i} className="flex flex-col items-center gap-2 group">
               <div className="h-12 w-full border border-border/40 flex items-center justify-center group-hover:border-accent transition-colors">
                 <action.icon className="h-4 w-4 text-muted group-hover:text-accent" />
               </div>
               <span className="text-[8px] font-bold uppercase tracking-widest text-muted">{action.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
        <ShieldCheck className="h-4 w-4 text-accent" />
        Digital Underwriting Stamp Verified
      </div>

      <div className="w-full absolute bottom-0 left-0 border-t border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Finalization & Issuance (Step 6/6)
      </div>
    </div>
  );
}
