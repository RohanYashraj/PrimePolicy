"use client";

import { Plus, ShieldCheck } from "lucide-react";

export default function CreatePolicyPage() {
  const steps = [
    "Product Selection",
    "Applicant Details",
    "Risk Assessment",
    "Agent Underwriting",
    "Coverage Config",
    "Review & Sign",
    "Issuance"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Issue New Policy</h2>
        <p className="text-sm font-medium uppercase tracking-widest text-muted">7-Step Autonomous Issuance Protocol</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-16">
        <div className="flex justify-between mb-4">
           {steps.map((step, i) => (
             <div key={i} className="flex flex-col items-center gap-2 group">
                <div className={`h-8 w-8 border flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-accent border-accent text-white' : 'border-border text-muted opacity-50'}`}>
                  {i + 1}
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-tighter hidden sm:block ${i === 0 ? 'text-foreground' : 'text-muted opacity-50'}`}>
                  {step}
                </span>
             </div>
           ))}
        </div>
        <div className="h-[1px] w-full bg-border relative">
           <div className="absolute top-0 left-0 h-full w-[14.28%] bg-accent" />
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="border border-border bg-foreground/[0.02] p-12 text-center">
         <div className="mb-8 rounded-none border border-border bg-foreground/5 p-8 inline-block">
            <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
         </div>
         <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Step 1: Product Selection</h3>
         <p className="text-sm text-muted mb-8 max-w-sm mx-auto leading-relaxed">
            Please select the insurance product template for the new policy. AI agents will tailor coverage based on subsequent inputs.
         </p>
         
         <div className="grid gap-4 sm:grid-cols-2 text-left max-w-xl mx-auto mb-12">
            {["Commercial Risk", "Cyber Liability", "Professional Indemnity", "Property & Casualty"].map((item) => (
              <button key={item} className="p-4 border border-border bg-background hover:border-accent transition-colors text-xs font-bold uppercase tracking-widest">
                {item}
              </button>
            ))}
         </div>

         <button className="h-12 border border-foreground bg-foreground px-8 text-xs font-bold uppercase tracking-[0.2em] text-background hover:bg-foreground/90 transition-all">
           Initialize Protocol
         </button>
      </div>
    </div>
  );
}
