export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 5: Decision & Pricing</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">Final underwriting decision and premium calculation</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 border border-border/60 p-8 bg-foreground/[0.01] space-y-6">
           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Premium Formula Components</h4>
           <div className="space-y-4">
             {[
               { label: "Base Premium", value: "$1,200.00" },
               { label: "Risk Adjustment (Node-03)", value: "+$420.00" },
               { label: "Compliance Discount", value: "-$60.00" },
               { label: "Agent Efficiency Rebate", value: "-$12.50" }
             ].map((line, i) => (
               <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                 <span className="text-muted">{line.label}</span>
                 <span>{line.value}</span>
               </div>
             ))}
             <div className="h-[1px] bg-border pt-2" />
             <div className="flex justify-between items-center text-lg font-bold tracking-tighter">
                <span>TOTAL ANNUAL PREMIUM</span>
                <span className="text-accent">$1,547.50</span>
             </div>
           </div>
        </div>

        <div className="border border-border/60 p-8 bg-foreground/[0.01] flex flex-col items-center justify-center text-center">
           <div className="h-16 w-16 bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <span className="text-xs font-bold text-accent">APPROVE</span>
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
             Underwriting agents have recommended APPROVAL for this policy.
           </p>
        </div>
      </div>
    </div>
  );
}
