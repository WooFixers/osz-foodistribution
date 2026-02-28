import type { Metadata } from "next";
import { Header, HeroSection } from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Accueil — Distribution alimentaire à Marrakech",
  description:
    "OSZ Food Distribution : spécialiste de la distribution de viandes et produits alimentaires à Marrakech. Service aux professionnels (restaurants, hôtels) et livraison à domicile pour les particuliers.",
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
