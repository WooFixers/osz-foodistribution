import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2, ShoppingBag, Package, CalendarCheck,
  FileText, Users, Star, Truck, ArrowRight,
} from "lucide-react";

export const ProBlock = () => (
  <section id="pro" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Pour les professionnels</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Un service dédié à votre établissement
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Restaurants, hôtels, traiteurs, entreprises : bénéficiez d&apos;un accompagnement sur mesure et d&apos;un approvisionnement fiable pour vos activités.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              { icon: Package, text: "Approvisionnement assuré" },
              { icon: Users, text: "Disponibilité permanente" },
              { icon: Truck, text: "Livraisons fiables et régulières" },
              { icon: ShoppingBag, text: "Large gamme de produits" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="h-13 px-8 rounded-sm group" asChild>
            <Link href="/professionnels">
              Découvrir l&apos;offre professionnelle
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="bg-accent rounded-lg p-10 lg:p-14">
          <Building2 className="w-16 h-16 text-primary mb-6" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Partenaire des professionnels</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nous accompagnons les professionnels de la restauration et de l&apos;hôtellerie avec des solutions d&apos;approvisionnement adaptées à chaque besoin.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-heading text-3xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground text-sm">Clients professionnels</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-primary">15+</p>
              <p className="text-muted-foreground text-sm">Années d&apos;expérience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ParticuliersBlock = () => (
  <section id="particuliers" className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 bg-background rounded-lg p-10 lg:p-14 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-primary mb-6" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Qualité professionnelle pour tous</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Accédez à des produits de qualité professionnelle, habituellement réservés aux restaurants et hôtels.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-heading text-3xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground text-sm">Qualité garantie</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-primary">48h</p>
              <p className="text-muted-foreground text-sm">Délai de livraison</p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Pour les particuliers</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Des produits d&apos;exception chez vous
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Profitez de la même qualité que celle proposée aux plus grands restaurants. Commandez simplement et recevez vos produits en toute fraîcheur.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              { icon: Star, text: "Produits de qualité professionnelle" },
              { icon: CalendarCheck, text: "Commande simple et pratique" },
              { icon: ShoppingBag, text: "Quantités adaptées aux particuliers" },
              { icon: Truck, text: "Livraison rapide à domicile" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="h-13 px-8 rounded-sm group" asChild>
            <Link href="/particuliers">
              Voir les produits pour particuliers
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
