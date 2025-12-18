import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectedItem, QuoteSettings, QuoteResult } from "@/types";

interface QuoteStore {
  // Selección de servicios
  selectedItems: SelectedItem[];
  addItem: (key: string) => void;
  removeItem: (key: string) => void;
  updateItemQty: (key: string, qty: number) => void;
  clearItems: () => void;
  isItemSelected: (key: string) => boolean;
  getItemQty: (key: string) => number;

  // Settings
  settings: QuoteSettings;
  updateSettings: (settings: Partial<QuoteSettings>) => void;

  // Resultado
  result: QuoteResult | null;
  setResult: (result: QuoteResult | null) => void;

  // Share info
  shareSlug: string | null;
  quoteId: string | null;
  setShareInfo: (shareSlug: string, quoteId: string) => void;

  // Email
  email: string | null;
  setEmail: (email: string) => void;

  // Estado UI
  step: "select" | "adjust" | "result";
  setStep: (step: "select" | "adjust" | "result") => void;

  // Reset
  resetQuote: () => void;
}

const defaultSettings: QuoteSettings = {
  clientType: "pyme",
  backAndForth: "normal",
  urgency: "normal",
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      // Selección de servicios
      selectedItems: [],
      
      addItem: (key) => {
        const items = get().selectedItems;
        if (!items.find((i) => i.key === key)) {
          set({ selectedItems: [...items, { key, qty: 1 }] });
        }
      },
      
      removeItem: (key) => {
        set({
          selectedItems: get().selectedItems.filter((i) => i.key !== key),
        });
      },
      
      updateItemQty: (key, qty) => {
        if (qty <= 0) {
          get().removeItem(key);
          return;
        }
        set({
          selectedItems: get().selectedItems.map((i) =>
            i.key === key ? { ...i, qty } : i
          ),
        });
      },
      
      clearItems: () => set({ selectedItems: [] }),
      
      isItemSelected: (key) => !!get().selectedItems.find((i) => i.key === key),
      
      getItemQty: (key) => get().selectedItems.find((i) => i.key === key)?.qty ?? 0,

      // Settings
      settings: defaultSettings,
      
      updateSettings: (newSettings) =>
        set({ settings: { ...get().settings, ...newSettings } }),

      // Resultado
      result: null,
      setResult: (result) => set({ result }),

      // Share info
      shareSlug: null,
      quoteId: null,
      setShareInfo: (shareSlug, quoteId) => set({ shareSlug, quoteId }),

      // Email
      email: null,
      setEmail: (email) => set({ email }),

      // Estado UI
      step: "select",
      setStep: (step) => set({ step }),

      // Reset
      resetQuote: () =>
        set({
          selectedItems: [],
          settings: defaultSettings,
          result: null,
          shareSlug: null,
          quoteId: null,
          step: "select",
        }),
    }),
    {
      name: "adhoc-quote-storage",
      partialize: (state) => ({
        email: state.email,
      }),
    }
  )
);
