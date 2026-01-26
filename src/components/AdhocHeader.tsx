"use client";

import Image from "next/image";

export function AdhocHeader() {
  return (
    <header className="sticky top-0 z-50 w-full glass-card-premium border-b border-adhoc-lavender/30 py-3 px-4 shadow-sm">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <a
          href="https://www.adhoc.inc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-adhoc-lavender/50 bg-white p-1">
            <Image
              src="/favicon.png"
              alt="Adhoc"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-display font-medium text-gray-900 tracking-tight">AdHoc</span>
        </a>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-adhoc-lavender/20 text-adhoc-violet rounded-full text-[10px] font-bold uppercase tracking-wider border border-adhoc-lavender/30">
            Pricing
          </span>
        </div>
      </div>
    </header>
  );
}
