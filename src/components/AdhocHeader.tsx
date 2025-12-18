"use client";

import Image from "next/image";

export function AdhocHeader() {
  return (
    <header className="w-full bg-white border-b border-adhoc-lavender/50 py-4 px-4 shadow-sm">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <a 
          href="https://www.adhoc.inc" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image 
            src="/adhoc-logo.png" 
            alt="Adhoc" 
            width={100} 
            height={32} 
            className="h-8 w-auto"
          />
        </a>
        <span className="px-3 py-1 bg-adhoc-lavender/30 text-adhoc-violet rounded-full text-xs font-medium">
          Pricing
        </span>
      </div>
    </header>
  );
}
