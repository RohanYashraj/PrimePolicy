"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface PolicyCreationContextType {
  saveStep: (() => Promise<void>) | null;
  setStepSaveFunction: (fn: (() => Promise<void>) | null) => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
}

const PolicyCreationContext = createContext<PolicyCreationContextType | undefined>(undefined);

export function PolicyCreationProvider({ children }: { children: React.ReactNode }) {
  const [saveStep, setSaveStep] = useState<(() => Promise<void>) | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const setStepSaveFunction = useCallback((fn: (() => Promise<void>) | null) => {
    setSaveStep(() => fn);
  }, []);

  return (
    <PolicyCreationContext.Provider value={{ saveStep, setStepSaveFunction, isSaving, setIsSaving }}>
      {children}
    </PolicyCreationContext.Provider>
  );
}

export function usePolicyCreation() {
  const context = useContext(PolicyCreationContext);
  if (!context) {
    throw new Error("usePolicyCreation must be used within a PolicyCreationProvider");
  }
  return context;
}
