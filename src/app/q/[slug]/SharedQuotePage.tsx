"use client";

import { useEffect, useState } from "react";
import { getQuoteByShareSlug } from "@/lib/db";
import { formatRange, catalogoData } from "@/lib/pricing";
import type { Quote, QuoteResult } from "@/types";
import { AdhocHeader } from "@/components/AdhocHeader";
import { AdhocFooter } from "@/components/AdhocFooter";
import { ResultTicket } from "@/components/ResultTicket";
import { Recommendations } from "@/components/Recommendations";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface SharedQuotePageProps {
  slug: string;
}

export function SharedQuotePage({ slug }: SharedQuotePageProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadQuote() {
      try {
        const data = await getQuoteByShareSlug(slug);
        if (data) {
          setQuote(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadQuote();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdhocHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-adhoc-violet animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Cargando presupuesto...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdhocHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-6xl mb-4">🤔</p>
            <h1 className="text-xl font-display font-medium text-gray-900 mb-2">
              Presupuesto no encontrado
            </h1>
            <p className="text-gray-500 mb-6">
              Este link puede haber expirado o ser incorrecto.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-adhoc-violet text-white rounded-xl font-medium hover:bg-adhoc-violet/90 transition-colors touch-feedback"
            >
              Crear tu presupuesto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <AdhocFooter />
      </div>
    );
  }

  // Get settings labels
  const clientLabel =
    catalogoData.multipliers.clientType[quote.client_type]?.label ??
    quote.client_type;
  const urgencyLabel =
    catalogoData.multipliers.urgency[quote.urgency]?.label ?? quote.urgency;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdhocHeader />
      
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        <h1 className="text-xl font-display font-medium text-gray-900 mb-4">
          Presupuesto compartido
        </h1>

        {/* Settings badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="px-3 py-1 bg-adhoc-lavender/20 text-adhoc-violet rounded-full text-sm">
            Cliente: {clientLabel}
          </span>
          {quote.urgency === "express" && (
            <span className="px-3 py-1 bg-adhoc-coral/10 text-adhoc-coral rounded-full text-sm">
              🚀 Express
            </span>
          )}
        </div>

        <div className="space-y-5">
          <ResultTicket
            items={quote.items}
            totalMin={quote.total_min}
            totalMax={quote.total_max}
          />

          <Recommendations />

          {/* CTA to create own quote */}
          <div className="bg-adhoc-gradient rounded-2xl p-5 text-white text-center">
            <p className="text-lg font-display font-medium mb-2">¿Sos diseñadora?</p>
            <p className="text-white/70 text-sm mb-4">
              Hacé tu propio presupuesto en segundos
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-adhoc-violet rounded-xl font-bold hover:bg-adhoc-lavender/20 transition-colors touch-feedback"
            >
              Empezar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400">
            Presupuesto generado el{" "}
            {new Date(quote.created_at).toLocaleDateString("es-AR")}
          </p>
        </div>
      </main>

      <AdhocFooter />
    </div>
  );
}
