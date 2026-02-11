"use client";

import { useState } from "react";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";

interface FileUploaderProps {
  label: string;
  onUpload: (fileIds: string[]) => void;
  maxFiles?: number;
  accept?: string;
}

export function FileUploader({
  label,
  onUpload,
  maxFiles = 3,
  accept = ".pdf,.jpg,.jpeg,.png",
}: FileUploaderProps) {
  const [files, setFiles] = useState<{ name: string; status: "uploading" | "done" }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // Mocking progress for now - will integrate with Convex storage in the steps
    const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, status: "done" as const }));
    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles));
    onUpload(["mock-id"]); 
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{label}</h4>
        <span className="text-[9px] text-muted/60 uppercase tracking-widest">Max {maxFiles} files</span>
      </div>
      
      <div className="relative group">
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="border border-dashed border-border/60 p-8 flex flex-col items-center justify-center gap-3 bg-foreground/[0.01] group-hover:bg-foreground/[0.03] group-hover:border-accent/40 transition-all">
          <Upload className="h-5 w-5 text-muted/40 group-hover:text-accent transition-colors" />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted/60">
            Drag files here or <span className="text-accent underline underline-offset-4">browse</span>
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid gap-2">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-border/40 bg-foreground/[0.01]">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-mono truncate max-w-[200px]">{file.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <button 
                  onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
