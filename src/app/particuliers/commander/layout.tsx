import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commander viande en ligne — Bœuf & Agneau Marrakech | OSZ Food Distribution",
  description:
    "Commandez votre viande bovine et agneau frais en ligne. Livraison à domicile à Marrakech en 48h. Filtrez par catégorie, type et prix. Paiement à la livraison. OSZ Food Distribution.",
  openGraph: {
    title: "Commander viande fraîche à Marrakech | OSZ Food Distribution",
    description: "Sélectionnez vos viandes et passez commande. Livraison domicile Marrakech sous 48h.",
    url: "https://www.osz-foodistribution.ma/particuliers/commander",
    siteName: "OSZ Food Distribution",
    locale: "fr_MA",
    type: "website",
  },
  alternates: { canonical: "https://www.osz-foodistribution.ma/particuliers/commander" },
};

export default function CommanderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
