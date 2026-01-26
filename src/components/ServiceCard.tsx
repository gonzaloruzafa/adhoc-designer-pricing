"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus, Check } from "lucide-react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  quantity: number;
  onToggle: () => void;
  onQuantityChange: (qty: number) => void;
  categoryEmoji?: string;
}

export function ServiceCard({
  service,
  isSelected,
  quantity,
  onToggle,
  onQuantityChange,
  categoryEmoji,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "service-item relative rounded-2xl p-4 cursor-pointer touch-feedback overflow-hidden",
        "border-2 transition-all duration-300",
        isSelected
          ? "selected border-adhoc-violet bg-adhoc-lavender/5 shadow-premium"
          : "border-gray-50 bg-white hover:border-gray-200"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox / emoji */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500",
            isSelected
              ? "bg-adhoc-violet text-white scale-110 shadow-lg shadow-adhoc-violet/20"
              : "bg-gray-50 text-xl grayscale-[0.5]"
          )}
        >
          {isSelected ? (
            <Check className="w-5 h-5" strokeWidth={3} />
          ) : (
            categoryEmoji
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-sm leading-tight transition-colors duration-300",
            isSelected ? "text-adhoc-violet" : "text-gray-800"
          )}>
            {service.title}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{service.subtitle}</p>
        </div>

        {/* Quantity controls */}
        {isSelected && service.qty_enabled && (
          <div
            className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90",
                quantity <= 1
                  ? "bg-gray-100 text-gray-300"
                  : "bg-adhoc-lavender/20 text-adhoc-violet hover:bg-adhoc-lavender/40"
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > 1) onQuantityChange(quantity - 1);
              }}
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="font-bold text-xs text-adhoc-violet min-w-[1rem] text-center">
              {quantity}
            </span>

            <button
              className="w-7 h-7 rounded-full bg-adhoc-lavender/20 text-adhoc-violet hover:bg-adhoc-lavender/40 active:scale-90 flex items-center justify-center transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(quantity + 1);
              }}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
