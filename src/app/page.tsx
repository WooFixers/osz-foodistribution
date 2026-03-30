import type { Metadata } from "next";
import { Header, HeroSection } from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "OSZ Food Distribution — Livraison viande fraîche à Marrakech",
  description:
    "Spécialiste de la distribution de viande bovine et agneau à Marrakech depuis plus de 15 ans. Livraison à domicile pour les particuliers et approvisionnement professionnel pour restaurants, hôtels et riads. Qualité garantie, chaîne du froid maîtrisée.",
  openGraph: {
    title: "OSZ Food Distribution — Livraison viande fraîche à Marrakech",
    description:
      "Distribution de viande bovine et agneau à Marrakech. Livraison domicile et approvisionnement pour restaurants et hôtels.",
    url: "https://www.osz-foodistribution.ma",
    siteName: "OSZ Food Distribution",
    locale: "fr_MA",
    type: "website",
  },
  alternates: { canonical: "https://www.osz-foodistribution.ma" },
};
import AboutSection from "@/components/sections/AboutSection";
import QualitySection from "@/components/sections/QualitySection";
import { ProBlock, ParticuliersBlock } from "@/components/sections/TargetBlocks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/sections/FooterSection";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <QualitySection />
      <ProBlock />
      <ParticuliersBlock />
      <WhyChooseUs />
      <TestimonialsSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
