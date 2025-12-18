"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Mail, ArrowRight } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  onSkip: () => void;
}

export function EmailModal({ isOpen, onClose, onSubmit, onSkip }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || isLoading) return;
    
    setIsLoading(true);
    try {
      await onSubmit(email);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl",
        "p-6 pb-8 shadow-2xl",
        "animate-in"
      )}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-adhoc-lavender/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-adhoc-violet" />
          </div>
          <h2 className="text-xl font-display font-medium text-gray-900 mb-2">
            Dejanos tu email
          </h2>
          <p className="text-gray-500 text-sm">
            Te enviaremos el informe completo con consejos y recomendaciones para tu presupuesto.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 transition-colors",
              "text-gray-900 placeholder:text-gray-400",
              "focus:outline-none focus:border-adhoc-violet",
              email && !isValidEmail
                ? "border-adhoc-coral/50"
                : "border-gray-200"
            )}
            autoFocus
          />

          <button
            type="submit"
            disabled={!isValidEmail || isLoading}
            className={cn(
              "w-full py-4 rounded-xl font-bold transition-all duration-200 touch-feedback",
              "flex items-center justify-center gap-2",
              isValidEmail && !isLoading
                ? "bg-adhoc-gradient text-white shadow-lg shadow-adhoc-violet/30"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <button
          onClick={onSkip}
          className="w-full mt-3 py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
        >
          Saltar por ahora
        </button>
      </div>
    </div>
  );
}
