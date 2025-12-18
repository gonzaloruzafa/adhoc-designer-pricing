"use client";

import { useState, useMemo } from "react";
import { useQuoteStore } from "@/store/quote-store";
import { catalogoData, calculateQuote } from "@/lib/pricing";
import { saveQuote, saveLead } from "@/lib/db";

import { AdhocHeader } from "@/components/AdhocHeader";
import { AdhocFooter } from "@/components/AdhocFooter";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ServiceCard } from "@/components/ServiceCard";
import { StickyCTA } from "@/components/StickyCTA";
import { ChipSelector } from "@/components/ChipSelector";
import { EmailModal } from "@/components/EmailModal";
import { ResultTicket } from "@/components/ResultTicket";
import { Recommendations } from "@/components/Recommendations";
import { ShareButtons } from "@/components/ShareButtons";
import { RotateCcw, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const {
    selectedItems,
    addItem,
    removeItem,
    updateItemQty,
    isItemSelected,
    getItemQty,
    settings,
    updateSettings,
    result,
    setResult,
    shareSlug,
    quoteId,
    setShareInfo,
    email,
    name,
    setEmail,
    setName,
    step,
    setStep,
    resetQuote,
  } = useQuoteStore();

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCapturedBefore, setEmailCapturedBefore] = useState(false);

  const filteredServices = useMemo(() => {
    if (!categoryFilter) return catalogoData.services;
    return catalogoData.services.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const categoryEmojis = useMemo(() => {
    return Object.fromEntries(
      catalogoData.categories.map((c) => [c.key, c.emoji])
    );
  }, []);

  const handleToggleService = (key: string) => {
    if (isItemSelected(key)) {
      removeItem(key);
    } else {
      addItem(key);
    }
  };

  const handleGoToAdjust = () => {
    if (selectedItems.length === 0) return;
    
    // Siempre mostrar modal de email en el primer paso
    if (!emailCapturedBefore) {
      setShowEmailModal(true);
      return;
    }
    
    // Si ya capturó email antes, ir directo a adjust
    setStep("adjust");
  };

  const handleGoToResult = async () => {
    const calculatedResult = calculateQuote(selectedItems, settings);
    setResult(calculatedResult);

    // Guardar cotización con email si existe
    console.log("💾 Saving quote with email:", email);
    const saved = await saveQuote(calculatedResult, email || null);
    console.log("✅ Quote saved:", saved);
    if (saved) {
      setShareInfo(saved.shareSlug, saved.quoteId);
    }
    
    setStep("result");
  };

  const handleEmailSubmit = async (submittedName: string, submittedEmail: string) => {
    // Guardar email y nombre en el store
    setName(submittedName);
    setEmail(submittedEmail);
    setEmailCapturedBefore(true);
    
    // Cerrar modal
    setShowEmailModal(false);

    // Guardar lead inmediatamente
    console.log("💾 Saving lead:", submittedName, submittedEmail);
    const saved = await saveLead(submittedEmail, submittedName);
    console.log("✅ Lead saved:", saved);

    // Continuar al paso de ajustes
    setStep("adjust");
  };

  const handleEmailSkip = () => {
    setShowEmailModal(false);
    setStep("adjust");
  };

  const handleBack = () => {
    if (step === "adjust") {
      setStep("select");
    } else if (step === "result") {
      setStep("adjust");
    }
  };

  const handleStartOver = () => {
    resetQuote();
  };

  // Render based on current step
  if (step === "select") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdhocHeader />
        
        <main className="flex-1 max-w-lg mx-auto w-full pb-28">
          {/* Hero */}
          <div className="px-4 pt-6 pb-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-adhoc-lavender/20 text-adhoc-violet font-medium text-xs uppercase tracking-wider mb-3">
              Para diseñadores/as gráficos
            </span>
            <h1 className="text-2xl font-display font-medium text-gray-900 mb-2">
              ¿Cuánto le cobro?
            </h1>
            <p className="text-gray-500 text-sm">
              Calculá tu presupuesto en segundos
            </p>
          </div>

          <Header
            title="Elegí los trabajos"
            step={1}
            totalSteps={3}
          />

          <div className="px-4 pb-3">
            <CategoryFilter
              categories={catalogoData.categories}
              selected={categoryFilter}
              onSelect={setCategoryFilter}
            />
          </div>

          <div className="px-4 space-y-2">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.key}
                service={service}
                isSelected={isItemSelected(service.key)}
                quantity={getItemQty(service.key)}
                onToggle={() => handleToggleService(service.key)}
                onQuantityChange={(qty) => updateItemQty(service.key, qty)}
                categoryEmoji={categoryEmojis[service.category]}
              />
            ))}
          </div>
        </main>

        <StickyCTA
          label="Continuar"
          onClick={handleGoToAdjust}
          disabled={selectedItems.length === 0}
          count={selectedItems.length}
        />

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailSubmit}
          onSkip={handleEmailSkip}
        />
      </div>
    );
  }

  if (step === "adjust") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdhocHeader />
        
        <main className="flex-1 max-w-lg mx-auto w-full pb-28">
          <Header
            title="Ajustes"
            subtitle="Personalizá tu cotización"
            step={2}
            totalSteps={3}
            onBack={handleBack}
          />

          <div className="px-4 py-2 space-y-6">
            <ChipSelector
              label="Tipo de cliente"
              options={Object.entries(catalogoData.multipliers.clientType).map(
                ([key, val]) => ({ key, label: val.label })
              )}
              value={settings.clientType}
              onChange={(key) => updateSettings({ clientType: key })}
            />

            <ChipSelector
              label="Idas y vueltas esperadas"
              options={Object.entries(catalogoData.multipliers.backAndForth).map(
                ([key, val]) => ({ key, label: val.label })
              )}
              value={settings.backAndForth}
              onChange={(key) => updateSettings({ backAndForth: key })}
            />

            <ChipSelector
              label="Urgencia"
              options={Object.entries(catalogoData.multipliers.urgency).map(
                ([key, val]) => ({ key, label: val.label })
              )}
              value={settings.urgency}
              onChange={(key) => updateSettings({ urgency: key })}
            />

            {/* Preview de servicios seleccionados */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Servicios seleccionados
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((item) => {
                  const service = catalogoData.services.find(
                    (s) => s.key === item.key
                  );
                  if (!service) return null;
                  return (
                    <span
                      key={item.key}
                      className="px-3 py-1.5 bg-adhoc-lavender/20 text-adhoc-violet rounded-full text-sm"
                    >
                      {service.title}
                      {item.qty > 1 && ` x${item.qty}`}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        <StickyCTA label="Calcular" onClick={handleGoToResult} />

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailSubmit}
          onSkip={handleEmailSkip}
        />
      </div>
    );
  }

  if (step === "result" && result) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdhocHeader />
        
        <main className="flex-1 max-w-lg mx-auto w-full">
          <Header
            title="Tu presupuesto"
            step={3}
            totalSteps={3}
            onBack={handleBack}
          />

          <div className="px-4 pb-8 space-y-5">
            <ResultTicket
              items={result.items}
              totalMin={result.totalMin}
              totalMax={result.totalMax}
            />

            <Recommendations />

            <ShareButtons
              result={result}
              shareSlug={shareSlug}
              onEmailClick={() => setShowEmailModal(true)}
            />

            <button
              onClick={handleStartOver}
              className="w-full flex items-center justify-center gap-2 py-3 text-gray-400 hover:text-adhoc-violet transition-colors touch-feedback"
            >
              <RotateCcw className="w-4 h-4" />
              Hacer otra cotización
            </button>

            {/* CTA Starter */}
            <a
              href="https://www.adhoc.inc/starter/disenadoras-graficas"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 p-4 rounded-2xl bg-gradient-to-br from-adhoc-violet/10 via-adhoc-lavender/20 to-adhoc-coral/10 border border-adhoc-lavender/30 hover:border-adhoc-violet/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-adhoc-violet/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-adhoc-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-medium text-gray-900 text-sm mb-1">
                    ¿Querés meter más tecnología en tu forma de trabajar?
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Automatizá presupuestos, contratos y cobros con nuestro Starter Pack para diseñadoras.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-adhoc-violet group-hover:gap-2 transition-all">
                    Conocer más
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </main>

        <AdhocFooter />

        <EmailModal
          isOpen={showEmailModal && !emailCapturedBefore}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailSubmit}
          onSkip={() => setShowEmailModal(false)}
        />
      </div>
    );
  }

  return null;
}
