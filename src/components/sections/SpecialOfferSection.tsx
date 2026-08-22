"use client";

import Image from "next/image";
import { MessageCircle, Flame, CheckCircle2, Truck, ShieldCheck, Sparkles, ArrowRight, Clock, DollarSign, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteFormDialog from "@/components/forms/QuoteFormDialog";

export default function SpecialOfferSection() {
  const whatsappUrl = `https://wa.me/212670594545?text=${encodeURIComponent(
    "Bonjour OSZ Food Distribution, je souhaite recevoir vos tarifs et commander pour notre restaurant/snack (Steak burger, filet de poulet, viande chawarma)."
  )}`;

  const products = [
    {
      id: "steak-burger",
      title: "Steak Viande Hachée de Bœuf",
      subtitle: "Spécial Burger & Smash",
      tag: "Pur Bœuf 100%",
      tagColor: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      description:
        "Pur bœuf sélectionné pour une texture tendre et un taux de matière grasse calibré. Tenue parfaite à la cuisson pour vos burgers gourmets et smash burgers.",
      specs: [
        "Calibrage sur mesure (100g, 120g, 150g, 180g)",
        "Jutosité et caramélisation optimales",
        "Disponible en frais ou surgelé",
      ],
    },
    {
      id: "filet-poulet",
      title: "Filet de Poulet Frais",
      subtitle: "Spécial Snacking & Cuisine",
      tag: "Volaille Supérieure",
      tagColor: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
      description:
        "Blancs de poulet soigneusement parés, sans peau ni gras superflu. Rendement maximal à la cuisson pour tacos, tenders panés, brochettes et plats chauds.",
      specs: [
        "Découpe nette, prêt à trancher ou mariner",
        "Rendement élevé sans perte d'eau",
        "Approvisionnement frais garanti chaque matin",
      ],
    },
    {
      id: "chawarma-poulet",
      title: "Viande Chawarma Poulet",
      subtitle: "Spécial Montage Broche",
      tag: "Rôtisserie & Snack",
      tagColor: "bg-primary/10 text-primary border-primary/20",
      description:
        "Découpe artisanale en lamelles spécialement calibrée pour le montage de broches régulières. Cuisson homogène, croustillant à l'extérieur et jus préservé.",
      specs: [
        "Épaisseur homogène pour broche stable",
        "Tenue de cuisson et saveur authentique",
        "Rendement au kilo garanti pour snack pro",
      ],
    },
  ];

  const guarantees = [
    {
      icon: ShieldCheck,
      title: "Avec agrément ONSSA",
      desc: "Tous nos produits sont validés et certifiés ONSSA (Loi 28-07) avec traçabilité garantie.",
      highlight: "Agrément ONSSA",
    },
    {
      icon: DollarSign,
      title: "PRIX IMBATTABLES",
      desc: "Tarifs grossiste ultra-compétitifs à Marrakech pour maximiser la rentabilité de votre snack.",
      highlight: "Meilleur Tarif",
    },
    {
      icon: Clock,
      title: "Commande Avant 17h00",
      desc: "Commandez chaque jour jusqu'à 17h00 par WhatsApp ou téléphone selon vos besoins de brigade.",
      highlight: "Avant 17h00",
    },
    {
      icon: Truck,
      title: "Livraison Avant 11h00",
      desc: "Livraison le lendemain matin avant 11h00 en véhicule frigorifique avant votre premier service.",
      highlight: "Livré avant 11h00",
    },
  ];

  return (
    <section id="offre-speciale" className="relative py-16 lg:py-24 bg-gradient-to-b from-amber-500/10 via-background to-background overflow-hidden border-y border-amber-500/20">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Header Title Box */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 lg:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm animate-pulse">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Offre Spéciale Professionnelle</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Restaurants • Snacks • Fast-Foods Marrakech</span>
            </div>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.15]">
            L&apos;Offre Incontournable pour Restaurants &amp; Snacks
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Sécurisez l&apos;approvisionnement de vos 3 produits phares avec des produits rigoureusement sélectionnés, un agrément sanitaire certifié et les prix les plus bas de Marrakech.
          </p>
        </div>

        {/* 4 Core Guarantees Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border-2 border-primary/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/40 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-900 dark:text-amber-300">
                    {item.highlight}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card border-2 border-primary/25 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${product.tagColor}`}>
                    {product.tag}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                    En stock
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {product.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-3 border-t border-border space-y-2.5">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wider">Avantages Clés :</p>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-muted-foreground">Tarif pro grossiste</span>
                <span className="font-heading text-base font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                  Prix Imbattable
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout & CTAs */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-950 via-primary-dark to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Utensils className="w-3.5 h-3.5" /> Pack Restauration Rapide &amp; Traditionnelle
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold leading-snug text-white">
                Commandez avant 17h, livré demain avant 11h00
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Testez la qualité de nos steaks burgers, filets de poulet et viande chawarma. Votre partenaire de confiance pour votre réussite : Qualité garantie, Prix Imbattables et produits avec agrément ONSSA.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
              <Button
                size="lg"
                className="h-13 sm:h-14 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
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
                  className="h-13 sm:h-14 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  Demander un devis pro
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </QuoteFormDialog>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
