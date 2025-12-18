import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "¿Cuánto cobrar? | Adhoc",
  description: "Calculadora de precios para diseñadoras argentinas. Cotizá tus trabajos de diseño en segundos.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "¿Cuánto cobrar? | Adhoc",
    description: "Calculadora de precios para diseñadoras argentinas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Cuánto cobrar? | Adhoc",
    description: "Calculadora de precios para diseñadoras argentinas",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7C6CD8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
