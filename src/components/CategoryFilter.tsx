"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Array<{ key: string; label: string; emoji: string }>;
  selected: string | null;
  onSelect: (key: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap touch-feedback",
          selected === null
            ? "bg-adhoc-violet text-white shadow-md shadow-adhoc-violet/20"
            : "bg-white border border-gray-200 text-gray-600 hover:border-adhoc-lavender"
        )}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap touch-feedback",
            selected === cat.key
              ? "bg-adhoc-violet text-white shadow-md shadow-adhoc-violet/20"
              : "bg-white border border-gray-200 text-gray-600 hover:border-adhoc-lavender"
          )}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
