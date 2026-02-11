"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatINR } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FileText, Edit3, Trash2, Clock, CheckCircle, ShieldAlert, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Id, Doc } from "@/convex/_generated/dataModel";

export default function PolicyQueuePage() {
  const { user } = useUser();
  const policies = useQuery(api.policies.listPolicies, 
    user ? { createdBy: user.id } : "skip"
  );
  
  const deletePolicy = useMutation(api.policies.deletePolicy);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "quote": return { icon: FileText, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/5", label: "Quote Draft" };
      case "under_review": return { icon: Clock, color: "text-amber-500", border: "border-amber-500/30", bg: "bg-amber-500/5", label: "Pending Underwriting" };
      case "approved": return { icon: ShieldAlert, color: "text-green-500", border: "border-green-500/30", bg: "bg-green-500/5", label: "Risk Approved" };
      case "issued": return { icon: CheckCircle, color: "text-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/5", label: "Policy Issued" };
      case "cancelled": return { icon: Ban, color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/5", label: "Voided" };
      default: return { icon: FileText, color: "text-muted", border: "border-muted/30", bg: "bg-muted/5", label: status };
    }
  };

  const handleDelete = async (id: Id<"policies">) => {
    try {
      await deletePolicy({ id });
    } catch (err) {
      console.error("Failed to delete policy:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12 px-6">
      {/* Header with Industrial Detail */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-accent hidden md:block" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-5xl font-bold tracking-tight uppercase leading-none">Policy Console</h2>
            <div className="h-[2px] w-12 bg-foreground/20 mt-2" />
          </div>
          <div className="flex gap-6 items-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
              Database: <span className="text-foreground">Underwriting Registry</span>
            </p>
            <div className="h-1 w-1 rounded-full bg-accent" />
            <p className="text-[10px] font-mono text-muted/60 uppercase tracking-widest">
              Underwriter Session: {user?.firstName || "Guest"}
            </p>
          </div>
        </div>
      </div>

      {/* Card Grid with Framer Motion Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {policies?.map((policy) => (
            <PolicyCard 
              key={policy._id} 
              policy={policy} 
              onDelete={handleDelete}
              statusConfig={getStatusConfig(policy.status)}
            />
          ))}
        </AnimatePresence>

        {/* Empty State / New Entry Placeholder */}
        {policies && policies.length === 0 && (
          <div className="col-span-full py-32 border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 border border-muted/20 flex items-center justify-center opacity-20">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/40">
              No active policies in database
            </p>
          </div>
        )}
      </div>

      {/* Decorative Footer Detail */}
      <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-muted/40 uppercase tracking-[0.2em]">
        <span>Encryption Standard: AES-256-GCM / Underwriting-Port-01</span>
        <div className="flex gap-4">
          <span>Latency: 24ms</span>
          <span>Index: by_policyId_date</span>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ 
  policy, 
  onDelete, 
  statusConfig 
}: { 
  policy: Doc<"policies">; 
  onDelete: (id: Id<"policies">) => void; 
  statusConfig: { icon: any; color: string; border: string; bg: string; label: string };
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative border border-border bg-background flex flex-col h-full overflow-hidden"
    >
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/[0.02] -mr-16 -mt-16 rotate-45 pointer-events-none group-hover:bg-accent/[0.03] transition-colors duration-500" />
      
      {/* ID Banner */}
      <div className="p-6 border-b border-border flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="text-[8px] font-bold text-accent uppercase tracking-[0.2em]">Policy ID</p>
          </div>
          <h3 className="text-2xl font-mono font-bold tracking-tighter leading-none italic">{policy.policyId || "PENDING"}</h3>
        </div>
        <div className={cn(
          "px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] border",
          statusConfig.border, 
          statusConfig.color,
          statusConfig.bg
        )}>
          {statusConfig.label}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[8px] font-bold text-muted/60 uppercase tracking-[0.2em]">Policyholder</p>
            <div className="space-y-0.5">
              <p className="text-sm font-bold uppercase tracking-tight line-clamp-1">{policy.clientName || "Pending Holder"}</p>
              <p className="text-[10px] font-mono text-muted/50 truncate italic">{policy.clientEmail || "No terminal address"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-border/40 pt-6">
            <div className="space-y-1.5">
              <p className="text-[8px] font-bold text-muted/60 uppercase tracking-[0.2em]">Sum Assured</p>
              <p className="text-xs font-mono font-bold tracking-tight">
                {policy.sumAssured ? formatINR(policy.sumAssured) : "₹0.00"}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[8px] font-bold text-muted/60 uppercase tracking-[0.2em]">Application Date</p>
              <p className="text-xs font-mono tracking-tight text-foreground/80">
                {new Date(policy.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Belt */}
        <div className="flex gap-2 pt-6 border-t border-border/40">
          <Link 
            href={`/dashboard/create-policy/step-1-intake?id=${policy._id}`}
            className="flex-1 h-11 border border-border flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all hover:border-foreground"
          >
            <div className="absolute inset-0 bg-foreground translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <Edit3 className="h-3 w-3 relative z-10 group-hover/btn:text-background transition-colors" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] relative z-10 group-hover/btn:text-background transition-colors">Review Application</span>
          </Link>
          <button 
            onClick={() => setShowConfirm(true)}
            className="w-11 h-11 border border-border flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Overlay (Actuarial Brutalism Variant) */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-red-600 z-20 p-8 flex flex-col justify-center items-center text-center text-white"
          >
            {/* Visual Noise Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            
            <ShieldAlert className="h-10 w-10 mb-5 relative z-10 drop-shadow-lg" />
            <div className="space-y-2 mb-8 relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em]">Delete Application</h4>
              <p className="text-[9px] font-mono text-white/70 leading-relaxed max-w-[180px]">
                NOTICE: Permanent removal of Policy {policy.policyId} from underwriting database.
              </p>
            </div>

            <div className="grid gap-3 w-full relative z-10">
              <button 
                onClick={() => onDelete(policy._id)}
                className="h-12 bg-white text-red-600 text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl hover:bg-white/90"
              >
                Confirm Deletion
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="h-12 border border-white/40 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
