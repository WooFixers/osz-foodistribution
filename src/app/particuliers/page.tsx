import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Livraison viande domicile Marrakech — Bœuf & Agneau frais | OSZ",
  description:
    "Commandez votre viande bovine et agneau frais en ligne. Livraison à domicile à Marrakech : Guéliz, Hivernage, Palmeraie, Targa, Route de l'Ourika. Commande simple via WhatsApp, délai 48h max. OSZ Food Distribution.",
  openGraph: {
    title: "Livraison viande à domicile Marrakech | OSZ Food Distribution",
    description:
      "Bœuf et agneau frais livrés chez vous à Marrakech. Qualité professionnelle accessible aux particuliers. Commande via WhatsApp.",
    url: "https://www.osz-foodistribution.ma/particuliers",
    siteName: "OSZ Food Distribution",
    locale: "fr_MA",
    type: "website",
  },
  alternates: { canonical: "https://www.osz-foodistribution.ma/particuliers" },
};
import {
  Phone, Mail, MapPin, Clock, ArrowRight, ArrowLeft,
  Truck, ShieldCheck, Thermometer, FileSearch,
  ShoppingCart, Star, Quote, BadgeCheck, Heart, Leaf,
  Package, Timer, Smartphone, Home, MapPinned, Users,
  Sparkles, TrendingUp, Award, ChevronRight, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

/* ─── HEADER ─── */
const PartHeader = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt="OSZ Food Distribution — retour à l'accueil" width={120} height={40} className="h-10 w-auto" />
      </Link>
      <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Accueil</Link>
        <Link href="/professionnels" className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">Professionnels</Link>
        <Link href="/particuliers" className="text-foreground font-semibold text-base transition-colors">Particuliers</Link>
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

/* ─── HERO ─── */
const PartHero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image src="/assets/particuliers-hero-bg.jpg" alt="Produits alimentaires premium" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary/60" />
    </div>
    <div className="relative container mx-auto py-32">
      <Link href="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground/90 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
      </Link>
      <div className="max-w-2xl animate-fade-up">
        <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm font-medium mb-4">Livraison viande domicile — Marrakech</p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
          Viande fraîche livrée à domicile à Marrakech
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
          Bœuf et agneau de qualité professionnelle, livrés directement chez vous où que vous soyez à Marrakech. Commande rapide via WhatsApp, livraison réfrigérée sous 48h.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer">Commander maintenant</a>
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 rounded-sm border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link href="/particuliers/commander">Voir nos produits</Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ─── CATEGORIES ─── */
const categories = [
  {
    icon: "🥩", title: "Viande de bœuf & agneau",
    desc: "Entrecôte, filet, côte à l'os, gigot, épaule — notre sélection de viande bovine et d'agneau frais, découpée selon vos préférences.",
    items: ["Entrecôte de bœuf — 189 MAD/kg", "Gigot d'agneau entier", "Épaule d'agneau", "Agneau entier (mechoui) — prix sur demande"],
    cta: "Commander via WhatsApp",
    ctaHref: "https://wa.me/212670594545",
    ctaExternal: true,
  },
  {
    icon: "🥕", title: "Légumes frais de saison",
    desc: "Une sélection de légumes frais pour compléter vos commandes de viande. Produits du marché, choisis pour leur fraîcheur et leur qualité.",
    items: ["Légumes de saison", "Herbes fraîches", "Légumes racines", "Crudités"],
    cta: "Nous demander la disponibilité",
    ctaHref: "https://wa.me/212670594545",
    ctaExternal: true,
  },
  {
    icon: "🍖", title: "Charcuterie",
    desc: "Produits artisanaux et savoureux, sélection premium. Des saveurs authentiques pour vos apéritifs et repas.",
    items: ["Saucissons", "Jambons", "Terrines", "Spécialités"],
    cta: "Voir la sélection",
    ctaHref: "/particuliers/commander",
    ctaExternal: false,
  },
];

const CategoriesSection = () => (
  <section id="produits" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Nos Produits</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Viande bovine et agneau frais — Livraison à domicile
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Notre sélection est centrée sur deux familles de produits : la viande de bœuf et l&apos;agneau frais. Des pièces sélectionnées chez des éleveurs partenaires, découpées sur commande pour garantir la fraîcheur maximale à la livraison.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="p-8 pb-0">
              <span className="text-5xl mb-4 block">{cat.icon}</span>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{cat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{cat.desc}</p>
              <ul className="space-y-2 mb-6">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground text-sm">
                    <BadgeCheck className="w-4 h-4 text-primary shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <Button className="w-full group-hover:bg-primary-dark transition-colors rounded-sm" asChild>
                {cat.ctaExternal ? (
                  <a href={cat.ctaHref} target="_blank" rel="noopener noreferrer">
                    {cat.cta} <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                ) : (
                  <Link href={cat.ctaHref}>
                    {cat.cta} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── ADVANTAGES ─── */
const shopAdvantages = [
  { icon: Award, title: "Qualité identique aux restaurants", desc: "Le même bœuf et le même agneau servis dans les restaurants et hôtels de Marrakech, maintenant accessible aux particuliers." },
  { icon: Leaf, title: "Fraîcheur garantie", desc: "Découpe à la commande, emballage isotherme, livraison réfrigérée. Votre viande arrive dans les meilleures conditions." },
  { icon: Smartphone, title: "Commande simple sur WhatsApp", desc: "Envoyez votre commande au 06 70 59 45 45. Confirmation sous 2h, livraison dans les 48h." },
  { icon: Truck, title: "Livraison sur tout Marrakech", desc: "Guéliz, Hivernage, Palmeraie, Médina, Targa, Route de l'Ourika — nous livrons partout à Marrakech." },
  { icon: Timer, title: "Paiement à la livraison", desc: "Pas de prépaiement en ligne. Vous payez à la réception de votre commande." },
];

const ShopAdvantagesSection = () => (
  <section id="avantages" className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Vos Avantages</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Pourquoi commander chez OSZ
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {shopAdvantages.map((a) => (
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

/* ─── DELIVERY ─── */
const deliveryItems = [
  { icon: Home, title: "Livraison à domicile", desc: "Vos produits livrés directement chez vous à Marrakech, dans le respect de la chaîne du froid." },
  { icon: Thermometer, title: "Chaîne du froid", desc: "Transport réfrigéré pour garantir la fraîcheur optimale de chaque produit." },
  { icon: Clock, title: "Créneaux fiables", desc: "Choisissez votre créneau de livraison et recevez vos produits à l'heure prévue." },
  { icon: Package, title: "Emballage sécurisé", desc: "Emballages isothermes et soignés pour préserver la qualité de vos produits." },
];

const DeliverySection = () => (
  <section id="livraison" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Livraison &amp; Service</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">Livré chez vous à Marrakech</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Nous livrons votre viande fraîche directement à votre domicile à Marrakech, dans un emballage réfrigéré isotherme qui maintient la chaîne du froid de notre entrepôt jusqu&apos;à votre cuisine. Délai maximum : 48h après confirmation de votre commande. Livraison offerte à partir de 250 MAD d&apos;achat.
          </p>
          <div className="space-y-6">
            {deliveryItems.map((item) => (
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
          <MapPinned className="w-12 h-12 text-primary mb-5" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Zone de livraison</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Notre service de livraison couvre l&apos;ensemble de la ville de Marrakech et ses environs.
          </p>
          <div className="space-y-3">
            {["Marrakech centre-ville", "Guéliz", "Hivernage", "Palmeraie", "Targa", "Route de l'Ourika"].map((zone) => (
              <div key={zone} className="flex items-center gap-3 text-foreground">
                <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-sm">{zone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── QUALITY ─── */
const QualitySectionPart = () => (
  <section className="relative section-padding overflow-hidden">
    <div className="absolute inset-0 bg-primary-dark" />
    <div className="relative container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary-foreground/60 uppercase tracking-[0.25em] text-sm font-semibold mb-3">Qualité &amp; Confiance</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">Votre satisfaction, notre priorité</h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed">
          Chaque produit que nous proposons est sélectionné avec exigence pour vous garantir fraîcheur, traçabilité et sécurité.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Star, title: "Sélection exigeante", desc: "Produits choisis avec soin auprès des meilleurs fournisseurs." },
          { icon: FileSearch, title: "Traçabilité garantie", desc: "Origine et parcours de chaque produit documentés." },
          { icon: ShieldCheck, title: "Normes sanitaires", desc: "Respect strict de toutes les réglementations en vigueur." },
          { icon: Heart, title: "Satisfaction client", desc: "Votre confiance est au cœur de notre engagement." },
        ].map((item) => (
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

/* ─── HOW IT WORKS ─── */
const HowItWorks = () => (
  <section id="comment-ca-marche" className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Comment ça marche</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">Commander en 3 étapes</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          { step: "01", title: "Choisissez votre viande", desc: "Parcourez notre sélection de bœuf et d'agneau frais. Précisez la découpe et la quantité souhaitée. Nos prix sont affichés dans notre catalogue, ou demandez un devis sur WhatsApp.", icon: ShoppingCart },
          { step: "02", title: "Envoyez votre commande sur WhatsApp", desc: "Écrivez-nous au 06 70 59 45 45. Notre équipe vous confirme la disponibilité, le prix final et le créneau de livraison dans les 2 heures. Paiement à la livraison.", icon: Smartphone },
          { step: "03", title: "Réceptionnez votre viande fraîche", desc: "Votre commande est livrée dans un emballage isotherme réfrigéré. Livraison 7j/7, de 8h à 20h, sur tout Marrakech. Délai : 48h maximum.", icon: Truck },
        ].map((s) => (
          <div key={s.step} className="text-center relative">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <s.icon className="w-9 h-9 text-primary" />
            </div>
            <span className="font-heading text-5xl font-bold text-primary/10 absolute top-0 right-4">{s.step}</span>
            <h3 className="font-heading text-xl font-bold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FEATURED PRODUCTS ─── */
const featuredProducts = [
  { name: "Entrecôte de bœuf fraîche", tag: "Populaire", price: "189 MAD/kg" },
  { name: "Filet d'agneau", tag: "Premium", price: "249 MAD/kg" },
  { name: "Poulet fermier entier", tag: "Nouveau", price: "69 MAD/kg" },
  { name: "Assortiment charcuterie", tag: "Offre spéciale", price: "149 MAD" },
];

const FeaturedSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Sélection du moment</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">Nos produits phares</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((p) => (
          <div key={p.name} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="h-48 bg-primary/5 flex items-center justify-center relative">
              <span className="text-6xl">🥩</span>
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</span>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl font-bold text-primary">{p.price}</span>
                <Button size="sm" className="rounded-sm" asChild>
                  <Link href="/particuliers/commander">
                    <ShoppingCart className="w-4 h-4 mr-1" /> Voir
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Fatima Z.", role: "Guéliz", text: "La viande arrive toujours fraîche et bien emballée. Je commande toutes les semaines pour ma famille à Guéliz — c'est devenu un réflexe.", stars: 5 },
  { name: "Youssef B.", role: "Hivernage", text: "Enfin une vraie qualité de bœuf accessible sans aller au marché. Le gigot d'agneau pour notre déjeuner du vendredi était exceptionnel.", stars: 5 },
  { name: "Sarah M.", role: "Palmeraie", text: "Simple, rapide, frais. La commande WhatsApp fonctionne parfaitement et la livraison est toujours dans les délais. Je recommande.", stars: 5 },
];

const PartTestimonialsSection = () => (
  <section className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Avis Clients</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">Ils nous font confiance</h2>
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
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="text-muted-foreground text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── LOCAL PRESENCE ─── */
const LocalPresence = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Présence locale</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">Livraison viande dans tout Marrakech</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Implantés à Marrakech depuis plus de 15 ans, nous connaissons la ville et ses quartiers. Notre zone de livraison couvre Marrakech centre, Guéliz, l&apos;Hivernage, la Palmeraie, Targa et la Route de l&apos;Ourika.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Vous n&apos;êtes pas sûr d&apos;être dans notre zone ? Contactez-nous sur WhatsApp — nous vous confirmons la faisabilité en moins de 2 heures.
          </p>
          <div className="space-y-4">
            {[
              { icon: MapPinned, text: "Service 100% local à Marrakech" },
              { icon: Users, text: "Proximité et écoute des clients" },
              { icon: TrendingUp, text: "Connaissance approfondie du marché local" },
              { icon: Sparkles, text: "Engagement envers la communauté" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-10 text-center">
          <MapPinned className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Basés à Marrakech</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Notre équipe locale est à votre service pour vous offrir les meilleurs produits alimentaires avec un service de proximité inégalé.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div><p className="font-heading text-3xl font-bold text-primary">100%</p><p className="text-muted-foreground text-sm">Service local</p></div>
            <div><p className="font-heading text-3xl font-bold text-primary">48h</p><p className="text-muted-foreground text-sm">Délai max</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTASection = () => (
  <section id="contact-part" className="section-padding bg-primary-dark">
    <div className="container mx-auto text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">Prêt à commander ?</h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
          Découvrez notre catalogue de produits premium et passez votre première commande en ligne. Livraison à domicile à Marrakech.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="h-14 px-8 rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/particuliers/commander">Commander maintenant</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 rounded-sm border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link href="/particuliers/commander">Voir le catalogue</Link>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 justify-center text-primary-foreground/70 text-sm">
          <span className="flex items-center gap-2 justify-center"><Phone className="w-4 h-4 text-primary-foreground/50" /><a href="tel:0670594545" className="hover:text-primary-foreground">06 70 59 45 45</a></span>
          <span className="flex items-center gap-2 justify-center"><MessageCircle className="w-4 h-4 text-primary-foreground/50" /><a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">WhatsApp</a></span>
          <span className="flex items-center gap-2 justify-center"><Mail className="w-4 h-4 text-primary-foreground/50" /> commande@osz-foodistribution.ma</span>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FOOTER ─── */
const PartFooter = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="mb-5">
            <Link href="/"><Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto brightness-0 invert opacity-80" /></Link>
          </div>
          <p className="text-background/60 text-sm leading-relaxed">
            Votre spécialiste de la livraison de viande fraîche à domicile à Marrakech.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-background/60">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><a href="tel:0670594545" className="hover:text-primary transition-colors">06 70 59 45 45</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /><a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> commande@osz-foodistribution.ma</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> Marrakech, Maroc</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Lun-Sam : 8h00 - 20h00</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Zone de livraison</h4>
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
              { href: "#produits", label: "Nos produits" },
              { href: "#livraison", label: "Livraison" },
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
export default function ParticuliersPage() {
  return (
    <main className="min-h-screen bg-background">
      <PartHeader />
      <PartHero />
      <CategoriesSection />
      <ShopAdvantagesSection />
      <DeliverySection />
      <QualitySectionPart />
      <HowItWorks />
      <FeaturedSection />
      <PartTestimonialsSection />
      <LocalPresence />
      <CTASection />
      <PartFooter />
      <FloatingWhatsApp />
    </main>
  );
}
