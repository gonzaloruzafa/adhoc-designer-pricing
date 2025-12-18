"use client";

import { Info } from "lucide-react";

const recommendations = [
  {
    icon: "💳",
    title: "Cobrá seña",
    description: "Pedí entre 30% y 50% al arrancar el proyecto.",
  },
  {
    icon: "🔄",
    title: "Rondas de correcciones",
    description: "Este precio incluye 2 rondas. Extras se cobran aparte.",
  },
  {
    icon: "⏰",
    title: "Validez",
    description: "Este presupuesto tiene validez de 7 días.",
  },
  {
    icon: "📝",
    title: "Por escrito",
    description: "Enviá el presupuesto por mail o WhatsApp para dejar registro.",
  },
];

export function Recommendations() {
  return (
    <div className="bg-adhoc-mustard/10 rounded-2xl p-5 border border-adhoc-mustard/20">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-adhoc-mustard" />
        <h3 className="font-display font-medium text-gray-900">Tips para tu presupuesto</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-lg flex-shrink-0">{rec.icon}</span>
            <div>
              <p className="font-medium text-gray-900 text-sm">{rec.title}</p>
              <p className="text-gray-500 text-sm">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
