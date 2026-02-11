"use client";

import { useEffect, useState } from "react";
import { formatINR } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";

interface IndianCurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function IndianCurrencyInput({
  label,
  value,
  onChange,
  placeholder,
  className,
  error,
}: IndianCurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value === 0 && !displayValue) return;
    setDisplayValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const numVal = parseInt(val, 10) || 0;
    setDisplayValue(val);
    onChange(numVal);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-mono text-xs">
          ₹
        </span>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent border border-border/60 p-3 pl-8 text-xs font-mono focus:border-accent outline-none transition-colors",
            error && "border-red-500/50"
          )}
        />
        {value > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest text-accent pointer-events-none">
            {formatINR(value)}
          </div>
        )}
      </div>
      {error && <p className="text-[9px] text-red-500 uppercase tracking-widest">{error}</p>}
    </div>
  );
}
