"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { IndianCurrencyInput } from "@/components/IndianCurrencyInput";
import { cn } from "@/lib/utils";
import { usePolicyCreation } from "@/context/PolicyCreationContext";

export default function IntakePage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id");
  
  const existingPolicy = useQuery(api.policies.getPolicy, 
    policyId ? { id: policyId as any } : "skip"
  );
  
  const createPolicy = useMutation(api.policies.createPolicy);
  const updatePolicy = useMutation(api.policies.updatePolicy);
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    dob: "",
    gender: "male" as "male" | "female" | "other",
    occupation: "",
    annualIncome: 0,
  });

  const { setStepSaveFunction } = usePolicyCreation();

  const saveCurrentStep = useCallback(async () => {
    if (policyId) {
      await updatePolicy({
        id: policyId as any,
        updates: formData
      });
    }
  }, [policyId, formData, updatePolicy]);

  useEffect(() => {
    setStepSaveFunction(saveCurrentStep);
    return () => setStepSaveFunction(null);
  }, [saveCurrentStep, setStepSaveFunction]);

  useEffect(() => {
    if (existingPolicy) {
      setFormData({
        clientName: existingPolicy.clientName || "",
        clientEmail: existingPolicy.clientEmail || "",
        dob: existingPolicy.dob || "",
        gender: (existingPolicy.gender as any) || "male",
        occupation: existingPolicy.occupation || "",
        annualIncome: existingPolicy.annualIncome || 0,
      });
    }
  }, [existingPolicy]);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 pt-1 bg-accent" />
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Step 1: Application Intake</h3>
          <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">
            Capture primary applicant identity and financial profile
          </p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Full Name</label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-transparent border border-border/60 p-3 text-xs font-mono focus:border-accent outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Email Address</label>
            <input
              type="email"
              required
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              placeholder="rahul@example.com"
              className="w-full bg-transparent border border-border/60 p-3 text-xs font-mono focus:border-accent outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Date of Birth</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-transparent border border-border/60 p-3 text-xs font-mono focus:border-accent outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full bg-transparent border border-border/60 p-3 text-xs font-mono focus:border-accent outline-none transition-colors"
              >
                <option value="male" className="bg-background">Male</option>
                <option value="female" className="bg-background">Female</option>
                <option value="other" className="bg-background">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Occupation</label>
            <input
              type="text"
              required
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              placeholder="e.g. Software Engineer"
              className="w-full bg-transparent border border-border/60 p-3 text-xs font-mono focus:border-accent outline-none transition-colors"
            />
          </div>

          <IndianCurrencyInput
            label="Annual Income"
            value={formData.annualIncome}
            onChange={(val) => setFormData({ ...formData, annualIncome: val })}
            placeholder="0"
          />

          <div className="pt-4">
             <div className="border border-border/40 p-6 bg-foreground/[0.01] space-y-3">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted">Data Integrity Check</h4>
                <div className="flex items-center gap-3">
                   <div className={cn("h-2 w-2 rounded-full", formData.clientName && formData.annualIncome ? "bg-green-500" : "bg-accent/40")} />
                   <span className="text-[10px] font-mono text-muted/60">
                     {formData.clientName && formData.annualIncome ? "Payload verified" : "Awaiting transmission payload..."}
                   </span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="border border-border/60 p-8 text-center text-muted uppercase text-[10px] tracking-[0.3em]">
        Policy Application Initiation (Step 1/6)
      </div>
    </div>
  );
}
