"use client";

export function AdhocFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center space-y-2">
        <p className="text-sm text-gray-500">
          <a 
            href="https://www.adhoc.inc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-adhoc-violet hover:text-adhoc-coral transition-colors font-medium"
          >
            Conocé más sobre Adhoc →
          </a>
        </p>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Adhoc S.A. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
