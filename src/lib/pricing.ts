import catalogo from "@/data/catalogo.json";
import type { CatalogoData, SelectedItem, CalculatedItem, QuoteSettings, QuoteResult } from "@/types";

const data = catalogo as CatalogoData;

/**
 * Redondea a valores "humanos" en pesos argentinos
 * - Hasta $50.000: redondea a $5.000
 * - Más de $50.000: redondea a $10.000
 */
export function roundToHuman(value: number): number {
  if (value <= 0) return 0;
  
  const step = value <= 50000 ? 5000 : 10000;
  return Math.round(value / step) * step;
}

/**
 * Formatea un número como precio argentino
 */
export function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatea un rango de precios
 */
export function formatRange(min: number, max: number): string {
  return `${formatARS(min)} – ${formatARS(max)}`;
}

/**
 * Calcula el multiplicador total basado en los settings
 */
export function calculateMultiplier(settings: QuoteSettings): number {
  const clientMult = data.multipliers.clientType[settings.clientType]?.value ?? 1;
  const bafMult = data.multipliers.backAndForth[settings.backAndForth]?.value ?? 1;
  const urgencyMult = data.multipliers.urgency[settings.urgency]?.value ?? 1;
  
  return clientMult * bafMult * urgencyMult;
}

/**
 * Calcula el precio de un ítem
 */
export function calculateItemPrice(
  service: { base_min_ars: number; base_max_ars: number },
  qty: number,
  multiplier: number
): { min: number; max: number } {
  const rawMin = service.base_min_ars * qty * multiplier;
  const rawMax = service.base_max_ars * qty * multiplier;
  
  return {
    min: roundToHuman(rawMin),
    max: roundToHuman(rawMax),
  };
}

/**
 * Calcula toda la cotización
 */
export function calculateQuote(
  selectedItems: SelectedItem[],
  settings: QuoteSettings
): QuoteResult {
  const multiplier = calculateMultiplier(settings);
  const items: CalculatedItem[] = [];
  let totalMin = 0;
  let totalMax = 0;

  for (const selected of selectedItems) {
    const service = data.services.find((s) => s.key === selected.key);
    if (!service) continue;

    const { min, max } = calculateItemPrice(service, selected.qty, multiplier);
    
    items.push({
      key: service.key,
      title: service.title,
      subtitle: service.subtitle,
      qty: selected.qty,
      min,
      max,
    });

    totalMin += min;
    totalMax += max;
  }

  return {
    items,
    totalMin: roundToHuman(totalMin),
    totalMax: roundToHuman(totalMax),
    settings,
  };
}

/**
 * Genera texto para compartir en WhatsApp (formato argentino corto)
 */
export function generateWhatsAppText(result: QuoteResult): string {
  const itemsText = result.items
    .map((item) => `• ${item.title}${item.qty > 1 ? ` (x${item.qty})` : ""}: ${formatRange(item.min, item.max)}`)
    .join("\n");

  const settingsLabels = {
    clientType: data.multipliers.clientType[result.settings.clientType]?.label ?? result.settings.clientType,
    urgency: data.multipliers.urgency[result.settings.urgency]?.label ?? result.settings.urgency,
  };

  return `💰 *Presupuesto de Diseño*

${itemsText}

*TOTAL: ${formatRange(result.totalMin, result.totalMax)}*

📌 Incluye 2 rondas de correcciones
💳 Seña: 30-50%
⏰ Validez: 7 días
${settingsLabels.urgency === "Express" ? "🚀 Entrega Express\n" : ""}
✨ Calculá tu presupuesto:`;
}

/**
 * Genera texto plano para copiar
 */
export function generatePlainText(result: QuoteResult): string {
  const itemsText = result.items
    .map((item) => `- ${item.title}${item.qty > 1 ? ` (x${item.qty})` : ""}: ${formatRange(item.min, item.max)}`)
    .join("\n");

  return `Presupuesto de Diseño

${itemsText}

TOTAL: ${formatRange(result.totalMin, result.totalMax)}

Incluye 2 rondas de correcciones
Seña: 30-50%
Validez: 7 días`;
}

export { data as catalogoData };
