"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface StickyCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  count?: number;
  className?: string;
}

export function StickyCTA({ label, onClick, disabled, count, className }: StickyCTAProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-4 pb-8 glass-card-premium border-t border-adhoc-lavender/20 z-40",
      "safe-area-inset-bottom",
      className
    )}>
      <div className="max-w-lg mx-auto">
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 touch-feedback",
            "flex items-center justify-center gap-2",
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-adhoc-gradient text-white shadow-premium hover:shadow-xl active:scale-[0.98] group"
          )}
        >
          {label}
          {count !== undefined && count > 0 && (
            <span className="bg-white/25 px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-white/50 backdrop-blur-sm">
              {count}
            </span>
          )}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
