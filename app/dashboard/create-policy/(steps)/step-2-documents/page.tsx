"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { FileUploader } from "@/components/FileUploader";
import { cn } from "@/lib/utils";
import { usePolicyCreation } from "@/context/PolicyCreationContext";

export default function DocumentsPage() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id");
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId as any } : "skip"
  );
  
  const updatePolicy = useMutation(api.policies.updatePolicy);

  const { setStepSaveFunction } = usePolicyCreation();

  const [docProgress, setDocProgress] = useState({
    identity: false,
    financial: false,
    previous: false,
  });

  const [idData, setIdData] = useState({
    aadharNumber: "",
    panNumber: "",
  });

  const saveCurrentStep = useCallback(async () => {
    if (policyId) {
      await updatePolicy({
        id: policyId as any,
        updates: idData
      });
    }
  }, [policyId, idData, updatePolicy]);

  useEffect(() => {
    setStepSaveFunction(saveCurrentStep);
    return () => setStepSaveFunction(null);
  }, [saveCurrentStep, setStepSaveFunction]);

  useEffect(() => {
    if (existingPolicy) {
       setDocProgress({
         identity: (existingPolicy.documentIds?.length || 0) > 0,
         financial: (existingPolicy.documentIds?.length || 0) > 1,
         previous: false,
       });
       setIdData({
         aadharNumber: existingPolicy.aadharNumber || "",
         panNumber: existingPolicy.panNumber || "",
       });
    }
  }, [existingPolicy]);

  const handleUpload = (type: keyof typeof docProgress) => {
    setDocProgress(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 2: Document Processing</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">
            Securely upload and verify supporting documentation
          </p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <FileUploader 
            label="Government Issued ID (Aadhar / PAN)" 
            onUpload={() => handleUpload('identity')} 
            maxFiles={2}
          />
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Aadhar Number</label>
               <input 
                 type="text" 
                 placeholder="XXXX XXXX XXXX"
                 className="w-full bg-transparent border border-border/60 p-3 text-[10px] font-mono focus:border-accent outline-none"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">PAN Number</label>
               <input 
                 type="text" 
                 placeholder="ABCDE1234F"
                 className="w-full bg-transparent border border-border/60 p-3 text-[10px] font-mono focus:border-accent outline-none"
               />
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <FileUploader 
            label="Financial Records (3 Months Salary / ITR)" 
            onUpload={() => handleUpload('financial')} 
            maxFiles={3}
          />

          <div className="border border-border/40 p-6 bg-foreground/[0.01] space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Document Verification Pipeline</h4>
             <div className="grid gap-3">
                {[
                  { label: "ID Authenticity", status: docProgress.identity ? "Verified" : "Pending" },
                  { label: "Income Validation", status: docProgress.financial ? "In Progress" : "Awaiting files" },
                  { label: "OCR Extraction", status: docProgress.identity || docProgress.financial ? "Running" : "Idle" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-muted/60 uppercase">{item.label}</span>
                    <span className={cn("font-bold", item.status === "Verified" ? "text-green-500" : "text-accent")}>
                      [{item.status}]
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Encryption Standard: AES-256 (Node-02)
      </div>
    </div>
  );
}
