"use client";

import { Flame, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  const whatsappUrl = `https://wa.me/212670594545?text=${encodeURIComponent(
    "Bonjour OSZ Food Distribution, je souhaite commander la viande de poulet pour chawarma en promo à 29 DH/kg."
  )}`;

  return (
    <aside
      aria-label="Offre promotionnelle exclusive"
      className="bg-gradient-to-r from-red-900 via-primary-dark to-amber-900 text-white py-3 sm:py-3.5 px-4 shadow-md relative z-50 border-b-2 border-amber-400/40"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          
          {/* Main Info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-md text-xs sm:text-sm uppercase tracking-wider shadow-sm animate-pulse">
              <Flame className="w-4 h-4 text-red-700 fill-red-700" />
              Offre Spéciale
            </span>

            <span className="font-heading font-bold text-white text-sm sm:text-base tracking-wide">
              Viande de Poulet pour Chawarma :
            </span>

            <span className="inline-flex items-baseline bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-sm sm:text-base shadow-sm">
              29 DH <span className="text-xs font-bold text-slate-800 ml-1">/ kg</span>
            </span>

            <span className="hidden lg:inline-flex items-center gap-1 text-amber-200/90 text-xs font-medium bg-white/10 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Marrakech &amp; Régions
            </span>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-4 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Commander sur WhatsApp</span>
            </a>

            <a
              href="#offre-speciale"
              className="hidden md:inline-flex items-center gap-1 text-white/80 hover:text-white text-xs font-medium underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Voir détails <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </aside>
  );
}


