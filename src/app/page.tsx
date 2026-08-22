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
  title: "OSZ Food Distribution — Fournisseur Viande Restaurants & Snacks à Marrakech",
  description:
    "Fournisseur de viande pour restaurants, snacks et fast-foods à Marrakech. Offre exclusive restauration : Steak burger pur bœuf, filet de poulet, viande chawarma. Agrément ONSSA, prix imbattables, livraison avant 11h.",
  openGraph: {
    title: "OSZ Food Distribution — Offre Restaurants & Snacks à Prix Imbattables Marrakech",
    description:
      "Distribution de viande à Marrakech pour restaurants et snacks : Steak burger, filet de poulet, viande chawarma. Agrément ONSSA et livraison quotidienne.",
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


