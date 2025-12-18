import { Metadata } from "next";
import { SharedQuotePage } from "./SharedQuotePage";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: "Presupuesto de Diseño | Adhoc",
    description: "Mirá este presupuesto de diseño cotizado con Adhoc",
    openGraph: {
      title: "Presupuesto de Diseño | Adhoc",
      description: "Mirá este presupuesto de diseño cotizado con Adhoc",
    },
  };
}

export default function SharedQuoteRoute({ params }: PageProps) {
  return <SharedQuotePage slug={params.slug} />;
}
