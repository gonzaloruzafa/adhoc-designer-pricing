"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Array<{ key: string; label: string; emoji: string }>;
  selected: string | null;
  onSelect: (key: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap touch-feedback uppercase tracking-wider",
          selected === null
            ? "bg-adhoc-violet text-white shadow-premium ring-2 ring-adhoc-violet/20"
            : "bg-white border border-gray-100 text-gray-500 hover:border-adhoc-lavender hover:text-adhoc-violet shadow-sm"
        )}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className={cn(
            "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap touch-feedback flex items-center gap-2",
            selected === cat.key
              ? "bg-adhoc-violet text-white shadow-premium ring-2 ring-adhoc-violet/20"
              : "bg-white border border-gray-100 text-gray-500 hover:border-adhoc-lavender hover:text-adhoc-violet shadow-sm"
          )}
        >
          <span className={cn("transition-transform duration-500", selected === cat.key ? "scale-125" : "")}>{cat.emoji}</span>
          <span className="uppercase tracking-wider">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
