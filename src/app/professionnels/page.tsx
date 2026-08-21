import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fournisseur viande restaurant Marrakech — Hôtels & Restauration | OSZ",
  description:
    "OSZ Food Distribution : fournisseur de viande bovine et agneau pour restaurants, hôtels et riads à Marrakech. Livraisons régulières, qualité HACCP, 500+ clients professionnels. Demandez votre devis personnalisé.",
  openGraph: {
    title: "Fournisseur viande restaurant & hôtel Marrakech | OSZ Food Distribution",
    description:
      "Approvisionnement professionnel en viande bovine et agneau à Marrakech. Qualité HACCP, livraisons planifiées, interlocuteur dédié.",
    url: "https://www.osz-foodistribution.ma/professionnels",
    siteName: "OSZ Food Distribution",
    locale: "fr_MA",
    type: "website",
  },
  alternates: { canonical: "https://www.osz-foodistribution.ma/professionnels" },
};
import {
  Phone, Mail, MapPin, Clock, ArrowRight, ArrowLeft,
  Truck, ShieldCheck, Thermometer, FileSearch, ClipboardCheck,
  Package, Utensils, ChefHat, Building2, Store, Users,
  Star, Quote, BadgeCheck, Handshake, Timer, HeadphonesIcon,
  Scale, Boxes, CalendarCheck, AlertTriangle, Award, Banknote, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import QuoteFormDialog from "@/components/forms/QuoteFormDialog";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import SpecialOfferSection from "@/components/sections/SpecialOfferSection";
import { Header } from "@/components/sections/HeroSection";

/* ─── HERO ─── */
const ProHero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image src="/assets/pro-hero-bg.jpg" alt="Distribution alimentaire professionnelle" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary/60" />
    </div>
    <div className="relative container mx-auto py-32">
      <Link href="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground/90 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
      </Link>
      <div className="max-w-2xl animate-fade-up">
        <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm font-medium mb-4">Approvisionnement professionnel — Marrakech</p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
          Fournisseur de viande pour restaurants, hôtels et riads à Marrakech
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
          Bœuf et agneau frais ou surgelé, livrés régulièrement dans votre établissement. Qualité constante, traçabilité HACCP, interlocuteur dédié. Plus de 500 professionnels nous font confiance à Marrakech.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <QuoteFormDialog>
            <Button size="lg" className="h-14 px-8 rounded-sm bg-white text-primary hover:bg-white/90 font-medium">
              Demander un devis
            </Button>
          </QuoteFormDialog>
          <Button size="lg" className="h-14 px-8 rounded-sm bg-transparent border border-white/50 text-white hover:bg-white/10 hover:text-white font-medium" asChild>
            <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp direct
            </a>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ─── SERVICES ─── */
const services = [
  { icon: Package, title: "Approvisionnement viande", desc: "Bœuf et agneau frais ou surgelé, en volume adapté à votre activité. Disponibilité régulière, pas de ruptures." },
  { icon: Scale, title: "Découpe sur spécification", desc: "Vos pièces préparées selon vos standards : grammage précis, type de découpe, conditionnement adapté à votre brigade." },
  { icon: CalendarCheck, title: "Livraisons planifiées", desc: "1, 2 ou 3 passages hebdomadaires selon vos besoins. Horaires adaptés à vos ouvertures de cuisine." },
  { icon: AlertTriangle, title: "Solutions urgentes", desc: "Besoin de dernière minute ? Notre équipe répond sur WhatsApp 7j/7 et peut organiser une livraison sous 24h." },
  { icon: FileSearch, title: "Documentation sanitaire", desc: "Certificats d'origine, fiches techniques, traçabilité complète disponibles sur demande pour vos audits et contrôles." },
  { icon: HeadphonesIcon, title: "Compte professionnel dédié", desc: "Un interlocuteur unique pour vos commandes, vos réclamations et vos ajustements de volume." },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Nos Services</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Une offre complète pour les professionnels
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          OSZ Food Distribution met à votre disposition une gamme complète de services pour répondre aux exigences de votre activité.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-secondary rounded-lg p-8 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── ADVANTAGES ─── */
const advantages = [
  { icon: Award, title: "Spécialiste viande", desc: "Contrairement aux grossistes généralistes, OSZ se concentre exclusivement sur la viande bovine et l'agneau. Une expertise pointue qui se ressent dans la qualité lot après lot." },
  { icon: Banknote, title: "Prix compétitifs", desc: "Tarification professionnelle dégressive selon les volumes. Devis personnalisé après évaluation de vos besoins." },
  { icon: Thermometer, title: "Chaîne du froid irréprochable", desc: "Transport réfrigéré de notre entrepôt à votre cuisine. Températures contrôlées à chaque étape." },
  { icon: FileSearch, title: "Traçabilité complète", desc: "Origine, abattoir, date de traitement — chaque lot est documenté. Conformité aux exigences de l'ONSSA." },
  { icon: ShieldCheck, title: "Normes HACCP", desc: "Application rigoureuse du système HACCP. Procédures de contrôle qualité régulières et documentées." },
  { icon: Handshake, title: "15 ans d'expertise locale", desc: "Présents à Marrakech depuis 15 ans, nous connaissons les spécificités de la restauration et de l'hôtellerie locales." },
  { icon: Timer, title: "Réactivité", desc: "Votre activité ne peut pas attendre. Nous répondons aux demandes urgentes et nous adaptons à vos pics d'activité saisonniers." },
  { icon: Users, title: "Partenariat long terme", desc: "Nous construisons des relations durables avec nos clients professionnels. 98% de fidélité sur nos comptes actifs." },
];

const AdvantagesSection = () => (
  <section id="avantages" className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Nos Avantages</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Pourquoi les professionnels de Marrakech choisissent OSZ
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((a) => (
          <div key={a.title} className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <a.icon className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── LOGISTICS ─── */
const logisticsItems = [
  { icon: CalendarCheck, title: "Livraisons régulières", desc: "Planning de livraisons fiable et ponctuel, adapté à votre rythme d'activité." },
  { icon: MapPin, title: "Large couverture", desc: "Marrakech, Guéliz, Hivernage, Palmeraie et Targa." },
  { icon: ClipboardCheck, title: "Gestion optimisée", desc: "Commandes simplifiées et suivi en temps réel de vos livraisons." },
  { icon: Boxes, title: "Gros volumes", desc: "Capacité logistique pour gérer des commandes importantes et régulières." },
  { icon: AlertTriangle, title: "Urgences", desc: "Solutions réactives pour vos besoins de dernière minute." },
];

const LogisticsSection = () => (
  <section id="logistique" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Logistique &amp; Livraison</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
            Livraisons de viande sur Marrakech et environs
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Notre logistique de distribution est calibrée pour les exigences de la restauration professionnelle : régularité, ponctualité, respect absolu de la chaîne du froid. Nous couvrons Marrakech centre, Guéliz, l&apos;Hivernage, la Palmeraie, Targa et les zones périphériques sur demande.
          </p>
          <div className="space-y-6">
            {logisticsItems.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-10">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Zones de livraison</h3>
          <div className="space-y-3">
            {["Marrakech et regions", "Guéliz", "Hivernage", "Palmeraie", "Targa"].map((zone) => (
              <div key={zone} className="flex items-center gap-3 text-foreground">
                <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium">{zone}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6">Vous êtes hors zone ? Contactez-nous pour étudier votre demande.</p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── QUALITY ─── */
const qualityItems = [
  { icon: ShieldCheck, title: "Normes HACCP", desc: "Application rigoureuse du système HACCP à chaque étape de notre chaîne." },
  { icon: ClipboardCheck, title: "Contrôles stricts", desc: "Procédures de contrôle qualité régulières et documentées." },
  { icon: FileSearch, title: "Traçabilité totale", desc: "Chaque produit est tracé de son origine jusqu'à votre établissement." },
  { icon: Thermometer, title: "Conservation optimale", desc: "Maintien strict des températures pour garantir la fraîcheur." },
  { icon: BadgeCheck, title: "Sécurité garantie", desc: "Engagement total envers la sécurité alimentaire de vos clients." },
];

const QualitySectionPro = () => (
  <section id="qualite" className="relative section-padding overflow-hidden">
    <div className="absolute inset-0 bg-primary-dark" />
    <div className="relative container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary-foreground/60 uppercase tracking-[0.25em] text-sm font-semibold mb-3">Qualité &amp; Conformité</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">
          L&apos;excellence au service de votre exigence
        </h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed">
          La sécurité alimentaire de vos clients commence chez votre fournisseur. Chaque lot de viande bovine et d&apos;agneau distribué par OSZ Food Distribution est traçable de son origine jusqu&apos;à votre réception. Nos processus HACCP sont documentés et disponibles sur demande pour vos audits internes ou les contrôles des autorités sanitaires marocaines.
        </p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {qualityItems.map((item) => (
          <div key={item.title} className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary-foreground/20 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-primary-foreground/80" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary-foreground mb-2">{item.title}</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CLIENT TYPES ─── */
const clientTypes = [
  { icon: ChefHat, title: "Restaurants gastronomiques et bistrots" },
  { icon: Building2, title: "Hôtels 4 et 5 étoiles" },
  { icon: Store, title: "Riads & maisons d'hôtes" },
  { icon: Utensils, title: "Traiteurs événementiels" },
  { icon: Package, title: "Services de livraison de repas" },
  { icon: Users, title: "Collectivités (entreprises, cantines)" },
];

const ClientTypesSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Nos Clients</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Ils nous font confiance au quotidien
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {clientTypes.map((c) => (
          <div key={c.title} className="bg-secondary rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
            <c.icon className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-heading text-sm font-semibold text-foreground">{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Chef de cuisine", role: "Restaurant gastronomique, Marrakech", text: "La constance de la qualité du bœuf et de l'agneau OSZ est ce qui fait la différence au quotidien. En 5 ans de collaboration, jamais de mauvaise surprise à la réception.", stars: 5 },
  { name: "Directeur F&B", role: "Hôtel, Palmeraie", text: "OSZ comprend les contraintes d'un hôtel : livraisons ponctuelles, documentation sanitaire en ordre, et réactivité quand on a besoin d'un supplément de dernière minute. C'est un partenariat qui fonctionne depuis 8 ans.", stars: 5 },
  { name: "Responsable achat", role: "Riad, Médina", text: "La capacité d'OSZ à gérer nos volumes en haute saison est un vrai atout. Quand Marrakech se remplit, notre approvisionnement en viande n'est jamais une source de stress.", stars: 5 },
];

const ProTestimonialsSection = () => (
  <section className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Témoignages</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          La confiance de nos partenaires
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-background rounded-lg p-8 shadow-sm relative">
            <Quote className="w-8 h-8 text-primary/15 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
            <div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-muted-foreground text-sm">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center gap-12 items-center opacity-40">
        <span className="font-heading text-2xl font-bold text-foreground">15+ ans</span>
        <span className="w-px h-8 bg-border" />
        <span className="font-heading text-2xl font-bold text-foreground">500+ clients pro</span>
        <span className="w-px h-8 bg-border hidden sm:block" />
        <span className="font-heading text-2xl font-bold text-foreground hidden sm:block">98% fidélité</span>
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTASection = () => (
  <section id="contact-pro" className="section-padding bg-primary-dark">
    <div className="container mx-auto text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">
          Vous approvisionnez en viande à Marrakech ?
        </h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
          Contactez notre équipe pour discuter de vos besoins en viande bovine et agneau. Nous établissons un devis personnalisé selon vos volumes, votre fréquence de livraison et vos spécifications de découpe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <QuoteFormDialog>
            <Button size="lg" className="h-14 px-8 rounded-sm bg-white text-primary hover:bg-white/90 font-medium">
              Demander un devis
            </Button>
          </QuoteFormDialog>
          <Button size="lg" className="h-14 px-8 rounded-sm bg-transparent border border-white/50 text-white hover:bg-white/10 hover:text-white font-medium" asChild>
            <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Nous écrire sur WhatsApp
            </a>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 justify-center text-primary-foreground/70 text-sm">
          <span className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4 text-primary-foreground/50" />
            <a href="tel:0670594545" className="hover:text-primary-foreground">06 70 59 45 45</a>
          </span>
          <span className="flex items-center gap-2 justify-center">
            <MessageCircle className="w-4 h-4 text-primary-foreground/50" />
            <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">WhatsApp</a>
          </span>
          <span className="flex items-center gap-2 justify-center">
            <Mail className="w-4 h-4 text-primary-foreground/50" /> commande@osz-foodistribution.ma
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FOOTER ─── */
const ProFooter = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="mb-5">
            <Link href="/">
              <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto brightness-0 invert opacity-80" />
            </Link>
          </div>
          <p className="text-background/60 text-sm leading-relaxed">
            Votre fournisseur de viande bovine et agneau à Marrakech. Approvisionnement professionnel pour restaurants, hôtels et riads.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Contact Pro</h4>
          <ul className="space-y-3 text-sm text-background/60">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><a href="tel:0670594545" className="hover:text-primary transition-colors">06 70 59 45 45</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /><a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> commande@osz-foodistribution.ma</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> Marrakech, Maroc</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Lun-Sam : 8h00 - 20h00</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Zones de livraison</h4>
          <ul className="space-y-2 text-sm text-background/60">
            {["Marrakech centre", "Guéliz", "Hivernage", "Palmeraie", "Targa"].map((z) => <li key={z}>{z}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Accueil" },
              { href: "/professionnels", label: "Espace Professionnels" },
              { href: "#services", label: "Nos services" },
              { href: "#qualite", label: "Qualité & HACCP" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-background/60 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-background/40">
        <p>© {new Date().getFullYear()} OSZ Food Distribution. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover:text-background/60 transition-colors">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-background/60 transition-colors">Politique de confidentialité</Link>
          <Link href="/cgv" className="hover:text-background/60 transition-colors">CGV</Link>
        </div>
      </div>
    </div>
  </footer>
);

/* ─── PAGE ─── */
export default function ProfessionnelsPage() {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <ProHero />
      <SpecialOfferSection />
      <ServicesSection />
      <AdvantagesSection />
      <LogisticsSection />
      <QualitySectionPro />
      <ClientTypesSection />
      <ProTestimonialsSection />
      <CTASection />
      <ProFooter />
      <FloatingWhatsApp />
    </main>
  );
}
