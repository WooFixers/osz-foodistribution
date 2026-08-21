"use client";

import Image from "next/image";
import { MessageCircle, Flame, CheckCircle2, Truck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteFormDialog from "@/components/forms/QuoteFormDialog";

export default function SpecialOfferSection() {
  const whatsappUrl = `https://wa.me/212670594545?text=${encodeURIComponent(
    "Bonjour OSZ Food Distribution, je suis intéressé par votre offre spéciale : Viande de poulet pour chawarma à 29 DH/kg."
  )}`;

  return (
    <section id="offre-speciale" className="relative py-16 lg:py-24 bg-gradient-to-b from-amber-500/10 via-background to-background overflow-hidden border-y border-amber-500/20">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto bg-card border-2 border-primary/30 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges Header */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
                  <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Offre Spéciale Restauration</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Tarif Exclusif Marrakech</span>
                </div>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.15]">
                Viande de Poulet pour Chawarma
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Spécialement sélectionnée et découpée pour les snacks, restaurants et rôtisseries. Idéale pour le montage de vos broches à chawarma, garantissant un rendement optimal, une texture tendre et un goût irréprochable.
              </p>

              {/* Price Callout */}
              <div className="flex flex-wrap items-baseline gap-3 p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                <span className="text-muted-foreground font-medium text-sm sm:text-base uppercase tracking-wider">
                  Prix Exceptionnel :
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-5xl sm:text-6xl font-black text-primary tracking-tight">
                    29
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                    DH
                  </span>
                  <span className="text-muted-foreground font-semibold text-lg ml-1">
                    / kg
                  </span>
                </div>
                <span className="ml-auto text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  En stock &amp; approvisionnement régulier
                </span>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { icon: CheckCircle2, text: "Découpe nette adaptée au montage broche" },
                  { icon: ShieldCheck, text: "Normes d'hygiène & traçabilité stricte" },
                  { icon: Truck, text: "Livraison quotidienne frigorifique à Marrakech" },
                  { icon: CheckCircle2, text: "Tarif dégressif sur gros volumes" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                    <item.icon className="w-4 h-4 text-primary shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 font-semibold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    Commander sur WhatsApp
                  </a>
                </Button>

                <QuoteFormDialog>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-7 rounded-xl border-primary/40 text-foreground hover:bg-primary/10 font-semibold text-base flex items-center justify-center gap-2"
                  >
                    Demander un devis de volume
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Button>
                </QuoteFormDialog>
              </div>
            </div>

            {/* Right Image Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl group">
                <Image
                  src="/assets/viande_poulet_chawarma.webp"
                  alt="Viande poulet pour chawarma Marrakech — 29 DH / kg"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold">Qualité Supérieure</p>
                      <p className="font-heading text-lg font-bold">Poulet frais pour broche chawarma</p>
                    </div>
                    <div className="bg-primary text-white px-3.5 py-1.5 rounded-lg font-bold text-lg shadow">
                      29 DH<span className="text-xs font-normal">/kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
