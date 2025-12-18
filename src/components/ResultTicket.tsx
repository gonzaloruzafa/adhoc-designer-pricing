"use client";

import { formatRange } from "@/lib/pricing";
import type { CalculatedItem } from "@/types";

interface ResultTicketProps {
  items: CalculatedItem[];
  totalMin: number;
  totalMax: number;
}

export function ResultTicket({ items, totalMin, totalMax }: ResultTicketProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-adhoc-gradient px-5 py-4 text-white">
        <h2 className="font-display font-medium text-lg">💰 Tu presupuesto</h2>
        <p className="text-white/70 text-sm">Rangos orientativos en pesos argentinos</p>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.key} className="px-5 py-3 flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">
                {item.title}
                {item.qty > 1 && (
                  <span className="ml-2 text-xs text-adhoc-violet font-normal">
                    x{item.qty}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>
            <p className="font-medium text-gray-700 text-sm text-right ml-4">
              {formatRange(item.min, item.max)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-adhoc-lavender/10 px-5 py-4 border-t-2 border-adhoc-lavender/30">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">TOTAL</span>
          <span className="font-bold text-adhoc-violet text-lg">
            {formatRange(totalMin, totalMax)}
          </span>
        </div>
      </div>
    </div>
  );
}
