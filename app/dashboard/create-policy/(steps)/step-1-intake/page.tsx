export default function IntakePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 1: Application Intake</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">Receive and validate application submissions</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4 border border-border/60 p-6 bg-foreground/[0.01]">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Intake Channel</h4>
          <div className="grid grid-cols-2 gap-3">
            {['Direct API', 'Portal Upload', 'Broker Email', 'Manual Entry'].map(item => (
              <button key={item} className="p-3 border border-border text-[9px] font-bold uppercase tracking-widest hover:border-accent transition-colors text-left">
                {item}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 border border-border/60 p-6 bg-foreground/[0.01]">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Validation Status</h4>
          <div className="flex items-center gap-4 text-[10px] font-mono p-4 border border-dashed border-border/40">
             <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
             Awaiting payload transmission...
          </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Application Data Schema Visualization (Node-01)
      </div>
    </div>
  );
}
