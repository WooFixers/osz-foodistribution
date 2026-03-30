"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt="OSZ Food Distribution — retour à l'accueil" width={120} height={40} className="h-10 w-auto" />
      </Link>
      <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Accueil</Link>
        <Link href="/professionnels" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Professionnels</Link>
        <Link href="/particuliers" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Particuliers</Link>
        <Link href="/particuliers/commander" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Commander</Link>
      </nav>
      <div className="hidden lg:flex items-center gap-4 text-muted-foreground text-base">
        <a href="tel:0670594545" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Phone className="w-3.5 h-3.5" /> 06 70 59 45 45
        </a>
      </div>
    </div>
  </header>
);

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src="/assets/hero-bg.jpg"
        alt="Produits alimentaires premium"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary/60" />
    </div>
    <div className="relative container mx-auto py-32">
      <div className="max-w-2xl animate-fade-up">
        <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm font-medium mb-4">
          Distribution de viande fraîche à Marrakech
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
          Votre distributeur de viande bovine et agneau à Marrakech
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
          Qualité professionnelle, livrée chez vous ou dans votre établissement. OSZ Food Distribution sert les particuliers et les professionnels de Marrakech depuis plus de 15 ans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/particuliers">Je commande à domicile</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 rounded-sm bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link href="/professionnels">Je suis professionnel</Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);
