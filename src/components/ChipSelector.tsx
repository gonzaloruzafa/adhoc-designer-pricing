"use client";

import { cn } from "@/lib/utils";

interface ChipOption {
  key: string;
  label: string;
}

interface ChipSelectorProps {
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (key: string) => void;
}

export function ChipSelector({ label, options, value, onChange }: ChipSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 touch-feedback",
              value === option.key
                ? "chip-selected"
                : "bg-white border border-gray-200 text-gray-600 hover:border-adhoc-lavender hover:text-adhoc-violet"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
