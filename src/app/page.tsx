import type { Metadata } from "next";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import { Header, HeroSection } from "@/components/sections/HeroSection";
import SpecialOfferSection from "@/components/sections/SpecialOfferSection";
import AboutSection from "@/components/sections/AboutSection";
import QualitySection from "@/components/sections/QualitySection";
import { ProBlock } from "@/components/sections/TargetBlocks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/sections/FooterSection";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "OSZ Food Distribution — Fournisseur de viande & Offre Chawarma à Marrakech",
  description:
    "Fournisseur de viande pour restaurants, snacks et hôtels à Marrakech. Offre spéciale : Viande de poulet pour chawarma au meilleur prix garanti. Approvisionnement régulier, qualité garantie.",
  openGraph: {
    title: "OSZ Food Distribution — Offre Poulet Chawarma & Viandes au Meilleur Prix Marrakech",
    description:
      "Distribution de viande à Marrakech. Offre exclusive restauration : Viande de poulet pour chawarma à prix imbattable.",
    url: "https://www.osz-foodistribution.ma",
    siteName: "OSZ Food Distribution",
    locale: "fr_MA",
    type: "website",
  },
  alternates: { canonical: "https://www.osz-foodistribution.ma" },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <SpecialOfferSection />
      <AboutSection />
      <QualitySection />
      <ProBlock />
      <WhyChooseUs />
      <TestimonialsSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}


