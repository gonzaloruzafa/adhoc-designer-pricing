"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  onBack?: () => void;
}

export function Header({ title, subtitle, step, totalSteps, onBack }: HeaderProps) {
  return (
    <div className="px-4 py-4">
      {/* Progress bar */}
      {step && totalSteps && (
        <div className="flex gap-1.5 mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                i + 1 <= step ? "bg-adhoc-violet" : "bg-gray-200"
              )}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-gray-400 hover:text-adhoc-violet transition-colors touch-feedback rounded-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-display font-medium text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
