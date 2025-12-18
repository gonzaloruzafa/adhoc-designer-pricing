"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Share2, Copy, MessageCircle, Check, Mail } from "lucide-react";
import { generateWhatsAppText, generatePlainText } from "@/lib/pricing";
import type { QuoteResult } from "@/types";

interface ShareButtonsProps {
  result: QuoteResult;
  shareSlug: string | null;
  onEmailClick: () => void;
}

export function ShareButtons({ result, shareSlug, onEmailClick }: ShareButtonsProps) {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareUrl = shareSlug 
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/q/${shareSlug}`
    : null;

  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback: copy link
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      return;
    }

    try {
      await navigator.share({
        title: "Presupuesto de Diseño",
        text: `Mirá mi presupuesto: ${result.totalMin.toLocaleString("es-AR")} - ${result.totalMax.toLocaleString("es-AR")} ARS`,
        url: shareUrl || undefined,
      });
    } catch (err) {
      // User cancelled or error
      console.log("Share cancelled");
    }
  };

  const handleOpenWhatsApp = () => {
    const text = generateWhatsAppText(result);
    const calculatorUrl = typeof window !== "undefined" ? window.location.origin : "https://adhoc.ar/cobrar";
    const fullText = `${text} ${calculatorUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-3">
      {/* Primary actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleOpenWhatsApp}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 touch-feedback bg-[#25D366] text-white hover:bg-[#20BA5A]"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </button>

        <button
          onClick={handleShare}
          className={cn(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 touch-feedback",
            copiedLink
              ? "bg-adhoc-lavender/30 text-adhoc-violet"
              : "bg-adhoc-violet text-white hover:bg-adhoc-violet/90"
          )}
        >
          {copiedLink ? (
            <>
              <Check className="w-5 h-5" />
              ¡Copiado!
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5" />
              Compartir
            </>
          )}
        </button>
      </div>

      {/* Secondary action */}
      <button
        onClick={onEmailClick}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium bg-white border border-gray-200 text-gray-600 hover:border-adhoc-lavender hover:text-adhoc-violet transition-colors touch-feedback"
      >
        <Mail className="w-5 h-5" />
        Recibir informe completo por email
      </button>
    </div>
  );
}
