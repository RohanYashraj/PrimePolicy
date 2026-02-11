"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePolicyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/create-policy/step-1-intake");
  }, [router]);

  return (
    <div className="flex h-[60vh] items-center justify-center">
       <div className="text-center space-y-4">
          <div className="h-8 w-8 bg-accent animate-pulse mx-auto" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Initialising Protocol Workspace...</p>
       </div>
    </div>
  );
}
