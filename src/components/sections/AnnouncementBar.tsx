"use client";

import { Flame, MessageCircle, ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export default function AnnouncementBar() {
  const whatsappUrl = `https://wa.me/212670594545?text=${encodeURIComponent(
    "Bonjour OSZ Food Distribution, je souhaite des informations sur l'offre Restaurants & Snacks (Steak burger, filet de poulet, viande chawarma)."
  )}`;

  return (
    <aside
      aria-label="Offre promotionnelle exclusive restaurants et snacks"
      className="bg-gradient-to-r from-red-950 via-primary-dark to-amber-950 text-white py-2.5 sm:py-3 px-4 shadow-md relative z-50 border-b-2 border-amber-400/40"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          
          {/* Main Info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-xs sm:text-sm uppercase tracking-wider shadow-sm animate-pulse">
              <Flame className="w-3.5 h-3.5 text-red-700 fill-red-700" />
              Offre Snacks &amp; Restos
            </span>

            <span className="font-heading font-bold text-white text-xs sm:text-sm tracking-wide">
              Steak Burger • Filet de Poulet • Viande Chawarma
            </span>

            <span className="inline-flex items-center bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md text-xs uppercase tracking-wide shadow-sm">
              Prix Imbattables
            </span>

            <span className="hidden md:inline-flex items-center gap-1 text-amber-200/90 text-xs font-semibold bg-white/10 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              Agrément ONSSA
            </span>

            <span className="hidden xl:inline-flex items-center gap-1 text-emerald-300 text-xs font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-emerald-400" />
              Cde avant 17h → Livré avant 11h
            </span>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
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


