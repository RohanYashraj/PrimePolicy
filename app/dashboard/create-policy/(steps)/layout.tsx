"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ShieldCheck, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { PolicyCreationProvider, usePolicyCreation } from "@/context/PolicyCreationContext";

const steps = [
  { id: 1, name: "Intake", path: "step-1-intake", label: "Application Intake" },
  { id: 2, name: "Documents", path: "step-2-documents", label: "Document Processing" },
  { id: 3, name: "Risk", path: "step-3-risk", label: "Risk Assessment" },
  { id: 4, name: "Compliance", path: "step-4-compliance", label: "Compliance Check" },
  { id: 5, name: "Pricing", path: "step-5-pricing", label: "Decision & Pricing" },
  { id: 6, name: "Issuance", path: "step-6-issuance", label: "Policy Issuance" },
];

function StepLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("id");
  const { saveStep, isSaving, setIsSaving } = usePolicyCreation();

  // Find current step index
  const currentStepIndex = steps.findIndex(step => pathname.includes(step.path));
  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNext = async () => {
    if (saveStep) {
      setIsSaving(true);
      try {
        await saveStep();
      } catch (err) {
        console.error("Failed to save step:", err);
        setIsSaving(false);
        return;
      }
      setIsSaving(false);
    }

    if (currentStepIndex < steps.length - 1) {
      const nextPath = `/dashboard/create-policy/${steps[currentStepIndex + 1].path}`;
      const url = policyId ? `${nextPath}?id=${policyId}` : nextPath;
      router.push(url);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevPath = `/dashboard/create-policy/${steps[currentStepIndex - 1].path}`;
      const url = policyId ? `${prevPath}?id=${policyId}` : prevPath;
      router.push(url);
    }
  };

  const handleSaveDraft = async () => {
    if (saveStep) {
      setIsSaving(true);
      await saveStep();
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Stepper Header */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Create New Policy</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Underwriting System: <span className="text-accent">{currentStep.label}</span>
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-4xl font-bold tracking-tighter text-foreground/10 tabular-nums">
              0{currentStep.id} / 06
            </span>
          </div>
        </div>

        {/* Visual Stepper */}
        <div className="relative">
          <div className="flex justify-between gap-2">
            {steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              
              return (
                <div key={step.id} className="flex-1 group">
                  <div 
                    className={cn(
                      "h-1.5 transition-all duration-500",
                      isActive ? "bg-accent" : isCompleted ? "bg-foreground/40" : "bg-border/40"
                    )} 
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <span 
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-widest transition-colors",
                        isActive ? "text-foreground" : "text-muted/60"
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] border border-border bg-foreground/[0.02] p-12 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        
        {children}
        
        {isSaving && (
        <div className="fixed bottom-12 right-12 z-50 flex items-center gap-4 bg-background border border-accent p-4 shadow-2xl animate-in slide-in-from-bottom-8">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] italic">Synchronizing Policy Data...</span>
        </div>
      )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-8 border-t border-border mt-12">
        <button
          onClick={handleBack}
          disabled={currentStepIndex === 0 || isSaving}
          className={cn(
            "group flex h-12 items-center gap-3 px-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-border",
            (currentStepIndex === 0 || isSaving) ? "opacity-30 cursor-not-allowed" : "hover:bg-foreground/5 hover:border-foreground/20"
          )}
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={!policyId || isSaving}
          className={cn(
            "group flex h-12 items-center gap-3 px-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-border",
            (!policyId || isSaving) ? "opacity-30 cursor-not-allowed" : "hover:bg-foreground/5 hover:border-foreground/20"
          )}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Draft"}
        </button>

        <button
          onClick={handleNext}
          disabled={isSaving}
          className={cn(
            "group flex h-12 items-center gap-4 bg-foreground px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/90 active:scale-95",
            currentStepIndex === steps.length - 1 && "bg-accent hover:bg-accent/90",
            isSaving && "opacity-50 cursor-not-allowed"
          )}
        >
          {currentStepIndex === steps.length - 1 ? (
            <>
              Finalise & Issue
              <ShieldCheck className="h-4 w-4" />
            </>
          ) : (
            <>
              {isSaving ? "Processing..." : "Continue"}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function StepLayout({ children }: { children: React.ReactNode }) {
  return (
    <PolicyCreationProvider>
      <StepLayoutContent>{children}</StepLayoutContent>
    </PolicyCreationProvider>
  );
}
