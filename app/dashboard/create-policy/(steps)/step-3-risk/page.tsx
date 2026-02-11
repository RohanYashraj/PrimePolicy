export default function RiskPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 3: Risk Assessment</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">Evaluate applicant risk profile</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
           <div className="border border-border/60 p-6 bg-foreground/[0.01]">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-4">Risk Telemetry</h4>
             <div className="space-y-3">
               {[
                 { label: "Longevity Delta", value: "82%" },
                 { label: "Behavioral Variance", value: "LOW" },
                 { label: "Geospatial Risk", value: "MODERATE" }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-[10px] font-mono px-3 py-2 border-l border-border/40">
                   <span>{item.label}</span>
                   <span className="text-accent">{item.value}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="flex flex-col items-center justify-center p-12 border border-border/60 bg-foreground/[0.01] text-center">
           <div className="mb-6 h-24 w-24 border border-border flex items-center justify-center rounded-full relative">
              <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin [animation-duration:3s]" />
              <span className="text-2xl font-bold tracking-tighter">0.14</span>
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Calculating Synthetic Risk Index...</p>
        </div>
      </div>
    </div>
  );
}
