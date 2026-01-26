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
    <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-adhoc-violet"></div>

      {/* Header */}
      <div className="px-6 py-6 border-b border-dashed border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-display font-medium text-xl text-gray-900">Tu Presupuesto</h2>
            <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-1 font-bold">Resumen de Servicios</p>
          </div>
          <div className="bg-adhoc-violet/10 p-2 rounded-xl">
            <span className="text-xl">📊</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-6 py-4 space-y-4">
        {items.map((item) => (
          <div key={item.key} className="flex justify-between items-start group">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 text-sm">
                  {item.title}
                </p>
                {item.qty > 1 && (
                  <span className="text-[10px] bg-adhoc-lavender/20 text-adhoc-violet px-2 py-0.5 rounded-full font-bold">
                    x{item.qty}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.subtitle}</p>
            </div>
            <p className="font-bold text-gray-900 text-sm ml-4 tabular-nums">
              {formatRange(item.min, item.max)}
            </p>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-4 px-6 py-6 bg-gray-50 border-t border-dashed border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Total Estimado</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-medium text-adhoc-violet">
              {formatRange(totalMin, totalMax)}
            </p>
            <p className="text-[10px] text-gray-400 mt-1 italic">Pesos Argentinos (ARS)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
