import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fournisseur alimentaire — Restaurants & Hôtels Marrakech",
  description:
    "Approvisionnement en viandes et produits alimentaires pour restaurants, hôtels et traiteurs à Marrakech. Normes HACCP, chaîne du froid complète, livraison régulière et volumes adaptés.",
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

/* ─── HEADER ─── */
const ProHeader = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto" />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Accueil</Link>
        <Link href="/professionnels" className="text-foreground font-semibold text-base transition-colors">Professionnels</Link>
        <Link href="/particuliers" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Particuliers</Link>
        <Link href="/particuliers/catalogue" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Catalogue</Link>
      </nav>
      <div className="hidden lg:flex items-center gap-4 text-muted-foreground text-base">
        <a href="tel:0670594545" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Phone className="w-3.5 h-3.5" /> 06 70 59 45 45
        </a>
      </div>
    </div>
  </header>
);

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
        <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm font-medium mb-4">Espace Professionnels</p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
          Le partenaire<br /><span className="italic font-normal">des professionnels</span>
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
          Approvisionnez votre établissement en viandes et produits alimentaires premium. Qualité constante, livraisons fiables et service dédié pour les professionnels de la restauration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <QuoteFormDialog>
            <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Demander un devis
            </Button>
          </QuoteFormDialog>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ─── SERVICES ─── */
const services = [
  { icon: Package, title: "Approvisionnement régulier", desc: "Livraisons planifiées de viandes et produits alimentaires premium selon vos besoins." },
  { icon: Boxes, title: "Large gamme de produits", desc: "Produits frais, surgelés et transformés : une offre complète pour votre activité." },
  { icon: Scale, title: "Volumes adaptés", desc: "Des quantités sur mesure, du petit commerce au grand établissement." },
  { icon: Handshake, title: "Solutions personnalisées", desc: "Un accompagnement dédié pour répondre à vos exigences spécifiques." },
  { icon: Truck, title: "Livraison rapide et fiable", desc: "Une logistique optimisée pour des livraisons ponctuelles et sécurisées." },
  { icon: HeadphonesIcon, title: "Service client dédié", desc: "Un interlocuteur unique pour gérer vos commandes et demandes." },
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
  { icon: Award, title: "Qualité supérieure", desc: "Produits rigoureusement sélectionnés auprès des meilleurs fournisseurs." },
  { icon: Banknote, title: "Prix compétitifs", desc: "Tarification avantageuse et transparente pour les professionnels." },
  { icon: Thermometer, title: "Chaîne du froid", desc: "Respect strict de la chaîne du froid à chaque étape." },
  { icon: FileSearch, title: "Traçabilité complète", desc: "Origine et parcours de chaque produit documentés." },
  { icon: ShieldCheck, title: "Normes sanitaires", desc: "Conformité totale aux réglementations en vigueur." },
  { icon: Users, title: "Équipe expérimentée", desc: "Des professionnels dédiés avec plus de 15 ans d'expertise." },
  { icon: HeadphonesIcon, title: "Service client dédié", desc: "Un interlocuteur unique pour un suivi personnalisé." },
  { icon: Timer, title: "Réactivité", desc: "Réponse rapide à vos demandes et capacité d'adaptation." },
];

const AdvantagesSection = () => (
  <section id="avantages" className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Nos Avantages</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Pourquoi choisir OSZ Food Distribution
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
            Une logistique de précision
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Notre chaîne logistique est conçue pour garantir la fraîcheur et la ponctualité de chaque livraison.
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
            {["Marrakech centre", "Guéliz", "Hivernage", "Palmeraie", "Targa"].map((zone) => (
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
          La sécurité alimentaire est au cœur de notre engagement. Chaque produit répond aux normes les plus strictes.
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
  { icon: ChefHat, title: "Restaurants gastronomiques" },
  { icon: Building2, title: "Hôtels" },
  { icon: Utensils, title: "Traiteurs" },
  { icon: Users, title: "Collectivités" },
  { icon: Store, title: "Boucheries" },
  { icon: Package, title: "Commerces alimentaires" },
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
  { name: "Chef Laurent M.", role: "Restaurant étoilé, Marrakech", text: "La constance de la qualité des produits OSZ est remarquable. Un partenaire indispensable pour notre cuisine.", stars: 5 },
  { name: "Nadia K.", role: "Directrice, Hôtel Le Grand", text: "Fiabilité des livraisons, qualité irréprochable et service client réactif. Nous travaillons ensemble depuis 8 ans.", stars: 5 },
  { name: "Ahmed R.", role: "Traiteur, Événements Premium", text: "OSZ comprend les exigences des professionnels. Leur capacité à gérer les volumes importants est un vrai atout.", stars: 5 },
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
          Prêt à collaborer ?
        </h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
          Contactez notre équipe commerciale pour obtenir un devis personnalisé ou ouvrir votre compte professionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <QuoteFormDialog>
            <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Demander un devis
            </Button>
          </QuoteFormDialog>
          <Button variant="outline" size="lg" className="h-14 px-8 rounded-sm border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
            Contacter notre équipe
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
            Votre partenaire de confiance pour l&apos;approvisionnement en viandes et produits alimentaires premium.
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
              { href: "/particuliers", label: "Espace Particuliers" },
              { href: "#services", label: "Nos services" },
              { href: "#qualite", label: "Qualité" },
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
        <p>© 2025 OSZ Food Distribution. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-background/60 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-background/60 transition-colors">Politique de confidentialité</a>
          <a href="#" className="hover:text-background/60 transition-colors">CGV</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ─── PAGE ─── */
export default function ProfessionnelsPage() {
  return (
    <main className="min-h-screen bg-background">
      <ProHeader />
      <ProHero />
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
