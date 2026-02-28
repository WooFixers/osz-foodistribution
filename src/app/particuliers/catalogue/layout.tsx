import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue — Viandes, Légumes & Charcuterie",
  description:
    "Découvrez notre catalogue : viandes fraîches et surgelées, légumes de saison, charcuteries artisanales. Commandez en ligne et faites-vous livrer à domicile à Marrakech.",
  alternates: { canonical: "https://www.osz-foodistribution.ma/particuliers/catalogue" },
};

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
