export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 2: Document Processing</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">Extract and verify submitted documents</p>
        </div>
      </div>

      <div className="border border-dashed border-border p-12 flex flex-col items-center justify-center gap-6 bg-foreground/[0.01]">
          <div className="h-12 w-12 border border-border flex items-center justify-center opacity-40">
            <div className="h-6 w-1 hover:bg-accent transition-colors border border-border" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Drop supporting files here or use sovereign OCR</p>
          <button className="h-10 border border-border px-8 text-[9px] font-bold uppercase tracking-widest hover:bg-foreground/5 transition-all">
            Scan Local Workspace
          </button>
      </div>

      <div className="grid gap-4">
        {[
          { label: "ID Verification", status: "Required" },
          { label: "Financial Records", status: "Required" },
          { label: "Previous Insurance Policy", status: "Optional" }
        ].map((doc, i) => (
          <div key={i} className="flex items-center justify-between border border-border/40 p-4 bg-foreground/[0.01]">
             <span className="text-[10px] font-bold uppercase tracking-widest">{doc.label}</span>
             <span className="text-[9px] font-bold uppercase tracking-widest text-muted">{doc.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
