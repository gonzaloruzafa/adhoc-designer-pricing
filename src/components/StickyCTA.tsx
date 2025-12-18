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
      "fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100",
      "safe-area-inset-bottom",
      className
    )}>
      <div className="max-w-lg mx-auto">
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-base transition-all duration-200 touch-feedback",
            "flex items-center justify-center gap-2",
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-adhoc-gradient text-white shadow-lg shadow-adhoc-violet/30 hover:shadow-xl active:scale-[0.98]"
          )}
        >
          {label}
          {count !== undefined && count > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
              {count}
            </span>
          )}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
