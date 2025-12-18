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
        "service-item relative rounded-xl p-3 cursor-pointer touch-feedback",
        "border-2 bg-white",
        isSelected
          ? "selected border-adhoc-violet"
          : "border-gray-100 hover:border-gray-200"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox / emoji */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
            isSelected
              ? "bg-adhoc-violet text-white"
              : "bg-gray-100 text-lg"
          )}
        >
          {isSelected ? (
            <Check className="w-4 h-4" strokeWidth={3} />
          ) : (
            categoryEmoji
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-tight truncate">
            {service.title}
          </h3>
          <p className="text-xs text-gray-400 truncate">{service.subtitle}</p>
        </div>

        {/* Quantity controls */}
        {isSelected && service.qty_enabled && (
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                quantity <= 1
                  ? "bg-gray-100 text-gray-300"
                  : "bg-adhoc-lavender/30 text-adhoc-violet hover:bg-adhoc-lavender/50 active:bg-adhoc-lavender"
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > 1) onQuantityChange(quantity - 1);
              }}
              disabled={quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            
            <span className="font-bold text-sm text-adhoc-violet min-w-[1.5rem] text-center">
              {quantity}
            </span>
            
            <button
              className="w-7 h-7 rounded-full bg-adhoc-lavender/30 text-adhoc-violet hover:bg-adhoc-lavender/50 active:bg-adhoc-lavender flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(quantity + 1);
              }}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Quantity badge for non-selected qty items */}
        {!isSelected && service.qty_enabled && (
          <span className="text-[10px] text-gray-300 flex items-center gap-0.5">
            <Plus className="w-2.5 h-2.5" />
          </span>
        )}
      </div>
    </div>
  );
}
