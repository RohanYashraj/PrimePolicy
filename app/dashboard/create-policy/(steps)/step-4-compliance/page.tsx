export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 4: Compliance Check</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">Verify regulatory compliance</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          "AML (Anti-Money Laundering) Screening",
          "KYC (Know Your Customer) Verification",
          "Sanctions List Interrogation",
          "Regional Regulatory Alignment Check"
        ].map((check, i) => (
          <div key={i} className="flex items-center gap-4 border border-border/40 p-4 bg-foreground/[0.01]">
             <div className="h-5 w-5 border border-border flex items-center justify-center">
               <div className="h-2 w-2 bg-accent/40" />
             </div>
             <span className="flex-1 text-[10px] font-bold uppercase tracking-widest">{check}</span>
             <span className="text-[8px] font-mono text-muted uppercase tracking-tighter">Verified: Node-04</span>
          </div>
        ))}
      </div>

      <div className="p-6 border border-border/60 bg-foreground/[0.01]">
         <p className="text-[9px] leading-relaxed text-muted uppercase tracking-widest font-medium">
           All checks are performed against sovereign regulation databases in real-time. Failure in any node will trigger a compliance hold.
         </p>
      </div>
    </div>
  );
}
