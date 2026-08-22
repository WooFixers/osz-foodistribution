"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, MessageCircle, FileText, Sparkles, Flame, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import QuoteFormDialog from "@/components/forms/QuoteFormDialog";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/assets/logo.png"
            alt="OSZ Food Distribution — retour à l'accueil"
            width={110}
            height={38}
            className="h-8 sm:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm lg:text-base font-medium transition-colors">
            Accueil
          </Link>
          <Link href="/professionnels" className="text-muted-foreground hover:text-foreground text-sm lg:text-base font-medium transition-colors">
            Professionnels
          </Link>
          <Link href="/professionnels#services" className="text-muted-foreground hover:text-foreground text-sm lg:text-base font-medium transition-colors">
            Services
          </Link>
          <Link href="/professionnels#qualite" className="text-muted-foreground hover:text-foreground text-sm lg:text-base font-medium transition-colors">
            Qualité
          </Link>
          <Link href="#offre-speciale" className="text-amber-700 hover:text-amber-800 text-sm lg:text-base font-semibold flex items-center gap-1 transition-colors">
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            Offre Snacks &amp; Restos
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground text-sm lg:text-base font-medium transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:0670594545"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" /> 06 70 59 45 45
          </a>
          <QuoteFormDialog>
            <Button size="sm" className="rounded-lg font-medium shadow-xs">
              Devis en 24h
            </Button>
          </QuoteFormDialog>
        </div>

        {/* Mobile Actions & Menu */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:0670594545"
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary active:scale-95 transition-transform"
            aria-label="Appeler OSZ Food Distribution"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/212670594545"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 active:scale-95 transition-transform"
            aria-label="WhatsApp OSZ Food Distribution"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          </a>

          {/* Mobile Navigation Drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-accent active:scale-95 transition-all"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-sm flex flex-col p-6">
              <SheetHeader className="p-0 text-left border-b border-border pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="/assets/logo.png"
                    alt="OSZ Food Distribution"
                    width={100}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              {/* Promo Banner inside Mobile Menu */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 mb-4">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  Offre Snacks &amp; Restaurants
                </p>
                <p className="text-xs text-muted-foreground">
                  Steak burger, filet de poulet et viande chawarma à <strong className="text-primary font-bold">prix imbattables</strong> avec agrément ONSSA.
                </p>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-3 text-base font-medium">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  href="/professionnels"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                >
                  Espace Professionnels
                </Link>
                <Link
                  href="/professionnels#services"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                >
                  Nos Services
                </Link>
                <Link
                  href="/professionnels#qualite"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                >
                  Qualité &amp; Traçabilité
                </Link>
                <Link
                  href="#offre-speciale"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold flex items-center justify-between"
                >
                  <span>Offre Snacks &amp; Restos</span>
                  <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded">Prix Imbattables</span>
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                >
                  Contact &amp; Livraison
                </Link>
              </nav>

              {/* Bottom CTAs */}
              <div className="mt-auto pt-6 border-t border-border space-y-3">
                <QuoteFormDialog>
                  <Button className="w-full h-12 rounded-xl font-semibold shadow-xs">
                    Demander un devis pro
                  </Button>
                </QuoteFormDialog>

                <div className="text-xs text-muted-foreground space-y-1.5 pt-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <a href="tel:0670594545" className="hover:underline font-medium text-foreground">06 70 59 45 45</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Lun - Sam : 8h00 - 20h00</span>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};


export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src="/assets/hero-bg.jpg"
        alt="Distribution alimentaire professionnelle Marrakech"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary/60" />
    </div>
    <div className="relative container mx-auto py-32">
      <div className="max-w-2xl animate-fade-up">
        <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm font-medium mb-4">
          Approvisionnement professionnel — Marrakech
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
          Votre distributeur de viande bovine et agneau à Marrakech
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
          Qualité professionnelle, conformité sanitaire ONSSA (Loi 28-07) et livraisons régulières pour restaurants, hôtels, riads et traiteurs. OSZ Food Distribution sert les professionnels de Marrakech depuis plus de 15 ans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <QuoteFormDialog>
            <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
              Demander un devis
            </Button>
          </QuoteFormDialog>
          <Button size="lg" className="h-14 px-8 rounded-sm bg-transparent border border-white/50 text-white hover:bg-white/10 hover:text-white font-medium" asChild>
            <Link href="/professionnels">Découvrir notre offre</Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

