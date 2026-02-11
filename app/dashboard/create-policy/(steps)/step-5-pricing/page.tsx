"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { IndianCurrencyInput } from "@/components/IndianCurrencyInput";
import { formatINR, formatINRShort } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import { Calculator, Zap, Gavel } from "lucide-react";
import { usePolicyCreation } from "@/context/PolicyCreationContext";

export default function PricingPage() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id");
  const { setStepSaveFunction } = usePolicyCreation();
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId as any } : "skip"
  );
  
  const updatePolicy = useMutation(api.policies.updatePolicy);

  const [sumAssured, setSumAssured] = useState(5000000); // Default 50 Lakhs
  const [premiumType, setPremiumType] = useState<"monthly" | "annually">("annually");

  const calculatedPremium = useMemo(() => {
    // Simple mock calculation: 0.2% of sum assured per year
    const yearly = Math.floor(sumAssured * 0.002);
    return premiumType === "monthly" ? Math.floor(yearly / 12) : yearly;
  }, [sumAssured, premiumType]);

  const saveCurrentStep = useCallback(async () => {
    if (policyId) {
      await updatePolicy({
        id: policyId as any,
        updates: {
          sumAssured,
          premiumAmount: calculatedPremium,
        }
      });
    }
  }, [policyId, sumAssured, calculatedPremium, updatePolicy]);

  useEffect(() => {
    setStepSaveFunction(saveCurrentStep);
    return () => setStepSaveFunction(null);
  }, [saveCurrentStep, setStepSaveFunction]);

  useEffect(() => {
    if (existingPolicy) {
      setSumAssured(existingPolicy.sumAssured || 5000000);
    }
  }, [existingPolicy]);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 5: Decision & Pricing</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">
            Determine sum assured and finalize premium configuration
          </p>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <Zap className="h-3 w-3" /> Coverage configuration
            </h4>
            
            <IndianCurrencyInput
              label="Sum Assured (Protection Amount)"
              value={sumAssured}
              onChange={setSumAssured}
              placeholder="e.g. 50,00,000"
            />

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Premium Frequency</label>
              <div className="flex gap-3">
                {["monthly", "annually"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPremiumType(type as any)}
                    className={cn(
                      "flex-1 p-3 border text-[10px] font-mono uppercase tracking-widest transition-all",
                      premiumType === type ? "border-accent bg-accent/5" : "border-border/40"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="border border-accent/40 bg-accent/[0.03] p-10 flex flex-col items-center justify-center text-center space-y-4">
              <Calculator className="h-6 w-6 text-accent mb-2" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Estimated Premium</h4>
              <div className="space-y-1">
                 <div className="text-4xl font-bold tracking-tighter tabular-nums">
                    {formatINR(calculatedPremium)}
                 </div>
                 <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
                   Per {premiumType === 'monthly' ? 'month' : 'year'}
                 </p>
              </div>
              <div className="pt-4 w-full">
                 <div className="border-t border-accent/20 pt-4 flex justify-between items-center text-[9px] font-mono uppercase text-muted">
                    <span>Base Sum Assured</span>
                    <span className="text-foreground">{formatINRShort(sumAssured)}</span>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
                <Gavel className="h-3 w-3" /> Underwriter Decision
              </h4>
              <div className="grid grid-cols-2 gap-3">
                 <button className="p-3 border border-border/40 text-[9px] font-bold uppercase tracking-widest hover:border-green-500/50 transition-all">
                   Accept Risk
                 </button>
                 <button className="p-3 border border-border/40 text-[9px] font-bold uppercase tracking-widest hover:border-red-500/50 transition-all">
                   Reject / Defer
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Premium Engine Architecture: PE-88
      </div>
    </div>
  );
}
