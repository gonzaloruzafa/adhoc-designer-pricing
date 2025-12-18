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
      {/* Tip bubble */}
      <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl p-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">💡 Tip: Guardalo en WhatsApp</p>
          <p className="text-xs text-gray-500">Mandátelo a vos mismo para tenerlo siempre a mano</p>
        </div>
      </div>

      {/* Primary actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleOpenWhatsApp}
          className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 touch-feedback bg-[#25D366] text-white hover:bg-[#20BA5A] hover:scale-105"
        >
          {/* Animated droplet indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
          </span>
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
    </div>
  );
}
