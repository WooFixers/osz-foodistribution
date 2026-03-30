import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2, ShoppingBag, Package, CalendarCheck,
  FileText, Users, Star, Truck, ArrowRight, ShieldCheck, MessageCircle,
} from "lucide-react";

export const ProBlock = () => (
  <section id="pro" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Pour les professionnels</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Fournisseur de viande pour restaurants et hôtels à Marrakech
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Votre restaurant, hôtel ou riad à Marrakech a besoin d&apos;un fournisseur de viande capable de tenir une qualité constante semaine après semaine. OSZ Food Distribution répond à cette exigence depuis 15 ans, avec des livraisons planifiées, une découpe sur spécification, et un interlocuteur dédié pour vos commandes.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              { icon: Package, text: "Approvisionnement régulier en bœuf et agneau" },
              { icon: FileText, text: "Découpe sur spécification (grammage, type de découpe)" },
              { icon: ShieldCheck, text: "Traçabilité HACCP complète" },
              { icon: Truck, text: "Réactivité sur commandes urgentes" },
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
            Bœuf et agneau en volume, frais ou surgelé selon vos besoins, livrés aux horaires qui s&apos;adaptent à votre brigade.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-heading text-3xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground text-sm">Clients professionnels à Marrakech</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-primary">15+</p>
              <p className="text-muted-foreground text-sm">Années d&apos;expérience en distribution viande</p>
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
            La même viande bovine et le même agneau servis dans les restaurants et hôtels de Marrakech, maintenant accessibles directement chez vous.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-heading text-3xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground text-sm">Qualité garantie</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-primary">48h</p>
              <p className="text-muted-foreground text-sm">Délai de livraison maximum</p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Pour les particuliers</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Livraison de viande fraîche à domicile — Marrakech
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Commandez votre viande bovine ou votre agneau frais et recevez-le directement à votre domicile à Marrakech. La même qualité que celle servie dans les restaurants et hôtels de la ville, accessible aux particuliers via une simple commande WhatsApp.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              { icon: Star, text: "Viande bovine et agneau de qualité professionnelle" },
              { icon: MessageCircle, text: "Commande rapide via WhatsApp" },
              { icon: Package, text: "Emballage réfrigéré, livraison à domicile" },
              { icon: Truck, text: "Délai maximum 48h sur Marrakech" },
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
              Commander votre viande fraîche
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
