"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Activity, ShieldAlert, HeartPulse } from "lucide-react";
import { usePolicyCreation } from "@/context/PolicyCreationContext";
import { Id } from "@/convex/_generated/dataModel";

export default function RiskPage() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id") as Id<"policies"> | null;
  const { setStepSaveFunction } = usePolicyCreation();
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId } : "skip"
  );
  
  const updatePolicy = useMutation(api.policies.updatePolicy);

  const [riskData, setRiskData] = useState({
    smokingStatus: "non-smoker" as "smoker" | "non-smoker",
    medicalHistory: [] as string[],
    lifestyleRisk: "low",
  });

  const saveCurrentStep = useCallback(async () => {
    if (policyId) {
      await updatePolicy({
        id: policyId,
        updates: riskData
      });
    }
  }, [policyId, riskData, updatePolicy]);

  useEffect(() => {
    setStepSaveFunction(saveCurrentStep);
    return () => setStepSaveFunction(null);
  }, [saveCurrentStep, setStepSaveFunction]);

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (existingPolicy && !hasInitialized) {
      setRiskData({
        smokingStatus: (existingPolicy.smokingStatus as "smoker" | "non-smoker") || "non-smoker",
        medicalHistory: existingPolicy.medicalHistory || [],
        lifestyleRisk: existingPolicy.lifestyleRisk || "low",
      });
      setHasInitialized(true);
    }
  }, [existingPolicy, hasInitialized]);

  const toggleCondition = (condition: string) => {
    setRiskData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(c => c !== condition)
        : [...prev.medicalHistory, condition]
    }));
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 3: Risk Assessment</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">
            Evaluate medical history and lifestyle risk factors
          </p>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <ShieldAlert className="h-3 w-3" /> Nicotine Exposure
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {["non-smoker", "smoker"].map(status => (
                <button
                  key={status}
                  onClick={() => {
                    const newStatus = status as "smoker" | "non-smoker";
                    setRiskData({ ...riskData, smokingStatus: newStatus });
                  }}
                  className={cn(
                    "p-4 border text-[10px] font-mono uppercase tracking-widest transition-all text-left",
                    riskData.smokingStatus === status ? "border-accent bg-accent/5" : "border-border/60 hover:border-accent/40"
                  )}
                >
                  {status.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <HeartPulse className="h-3 w-3" /> Declared Conditions
            </h4>
            <div className="grid gap-3">
              {["Diabetes", "Hypertension", "Asthma", "Heart Condition", "Surgery in last 5 years"].map(condition => (
                <button
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={cn(
                    "p-3 border text-[10px] font-mono uppercase tracking-widest transition-all flex justify-between items-center px-4",
                    riskData.medicalHistory.includes(condition) ? "border-accent bg-accent/5 text-foreground" : "border-border/40 text-muted"
                  )}
                >
                  {condition}
                  {riskData.medicalHistory.includes(condition) && <Activity className="h-3 w-3 animate-pulse text-accent" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Lifestyle Risk Matrix</h4>
            <div className="flex flex-col gap-3">
              {["low", "moderate", "high"].map(level => (
                <button
                  key={level}
                  onClick={() => setRiskData({ ...riskData, lifestyleRisk: level })}
                  className={cn(
                    "p-4 border text-[10px] font-mono uppercase tracking-widest transition-all text-left relative overflow-hidden",
                    riskData.lifestyleRisk === level ? "border-accent" : "border-border/40"
                  )}
                >
                  {level} Risk Profile
                  {riskData.lifestyleRisk === level && (
                    <div className="absolute top-0 right-0 h-full w-1.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-foreground/[0.01] border border-border/40 p-8 space-y-4">
             <p className="text-[10px] font-mono text-muted uppercase leading-relaxed">
               Risk Engine Evaluation: <br/>
               <span className="text-foreground font-bold">
                 {riskData.medicalHistory.length > 0 || riskData.smokingStatus === 'smoker' 
                   ? "Sub-standard loading may apply" 
                   : "Standard mortality rates predicted"}
               </span>
             </p>
          </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Actuarial Risk Engine: V4.2
      </div>
    </div>
  );
}
