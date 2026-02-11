"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ShieldCheck, UserPlus, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePolicyCreation } from "@/context/PolicyCreationContext";

export default function CompliancePage() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id");
  const { setStepSaveFunction } = usePolicyCreation();
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId as any } : "skip"
  );
  
  const updatePolicy = useMutation(api.policies.updatePolicy);

  const [kycData, setKycData] = useState({
    nomineeName: "",
    nomineeRelation: "",
    nomineeDob: "",
    kycMethod: "Video KYC",
    declarationsAccepted: false,
  });

  const saveCurrentStep = useCallback(async () => {
    if (policyId) {
      await updatePolicy({
        id: policyId as any,
        updates: {
          nomineeName: kycData.nomineeName,
          nomineeRelation: kycData.nomineeRelation,
          kycStatus: kycData.declarationsAccepted ? "verified" : "pending"
        }
      });
    }
  }, [policyId, kycData, updatePolicy]);

  useEffect(() => {
    setStepSaveFunction(saveCurrentStep);
    return () => setStepSaveFunction(null);
  }, [saveCurrentStep, setStepSaveFunction]);

  useEffect(() => {
    if (existingPolicy) {
      setKycData({
        nomineeName: existingPolicy.nomineeName || "",
        nomineeRelation: existingPolicy.nomineeRelation || "",
        nomineeDob: "", 
        kycMethod: "Video KYC",
        declarationsAccepted: existingPolicy.kycStatus === "verified",
      });
    }
  }, [existingPolicy]);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 4: Compliance & KYC</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">
            Ensure regulatory adherence and verify nominee details
          </p>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <UserPlus className="h-3 w-3" /> Beneficiary / Nominee Details
            </h4>
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Nominee Full Name</label>
                 <input 
                   type="text" 
                   value={kycData.nomineeName}
                   onChange={(e) => setKycData({ ...kycData, nomineeName: e.target.value })}
                   placeholder="e.g. Priya Sharma"
                   className="w-full bg-transparent border border-border/60 p-3 text-[10px] font-mono focus:border-accent outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Relationship</label>
                    <select 
                      className="w-full bg-transparent border border-border/60 p-3 text-[10px] font-mono focus:border-accent outline-none"
                      value={kycData.nomineeRelation}
                      onChange={(e) => setKycData({ ...kycData, nomineeRelation: e.target.value })}
                    >
                      <option value="" className="bg-background">Select Relation</option>
                      <option value="Spouse" className="bg-background">Spouse</option>
                      <option value="Child" className="bg-background">Child</option>
                      <option value="Parent" className="bg-background">Parent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Nominee DOB</label>
                    <input 
                      type="date"
                      className="w-full bg-transparent border border-border/60 p-3 text-[10px] font-mono focus:border-accent outline-none"
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <Fingerprint className="h-3 w-3" /> KYC Authentication
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {["Video KYC", "e-KYC (Aadhar)", "Physical Verification"].map(method => (
                <button
                  key={method}
                  onClick={() => setKycData({ ...kycData, kycMethod: method })}
                  className={cn(
                    "p-4 border text-[9px] font-mono uppercase tracking-widest transition-all text-left",
                    kycData.kycMethod === method ? "border-accent bg-accent/5" : "border-border/60 hover:border-accent/40"
                  )}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-border/40 p-6 bg-foreground/[0.01] space-y-4">
             <div className="flex gap-4">
                <input 
                  type="checkbox" 
                  id="declarations" 
                  checked={kycData.declarationsAccepted}
                  onChange={(e) => setKycData({ ...kycData, declarationsAccepted: e.target.checked })}
                  className="mt-1 h-3 w-3 border-border rounded-none bg-transparent"
                />
                <label htmlFor="declarations" className="text-[9px] font-mono text-muted uppercase leading-relaxed">
                  I hereby declare that the information provided is accurate and complies with IRDAI Anti-Money Laundering (AML) guidelines.
                </label>
             </div>
             {kycData.declarationsAccepted && (
               <div className="flex items-center gap-2 text-[9px] font-bold text-green-500 uppercase tracking-widest animate-in fade-in slide-in-from-left-2">
                 <ShieldCheck className="h-3 w-3" /> Compliance Check Passed
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Regulatory Compliance: AML-2026/V2
      </div>
    </div>
  );
}
