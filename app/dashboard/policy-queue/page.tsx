"use client";

import { ReceiptText } from "lucide-react";

export default function PolicyQueuePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-none border border-border bg-foreground/5 p-8">
        <ReceiptText className="mx-auto h-12 w-12 text-muted animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold tracking-tighter uppercase">Policy Queue</h2>
      <p className="mt-4 max-w-md text-sm font-medium uppercase tracking-widest text-muted leading-relaxed">
        Autonomous policy ingestion and validation engine coming soon.
      </p>
      <div className="mt-12 h-1 w-32 bg-accent/20">
         <div className="h-full w-1/3 bg-accent animate-[loading_2s_infinite]" />
      </div>
    </div>
  );
}
