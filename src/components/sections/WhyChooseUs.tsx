import { Award, Banknote, Truck, ShieldCheck, Handshake } from "lucide-react";

const reasons = [
  { icon: Award, title: "Produits premium", desc: "Une sélection rigoureuse de viandes et produits alimentaires d'exception." },
  { icon: Banknote, title: "Prix compétitifs", desc: "Des tarifs justes sans compromis sur la qualité." },
  { icon: Truck, title: "Livraison rapide", desc: "Un service de livraison fiable et ponctuel." },
  { icon: ShieldCheck, title: "Satisfaction garantie", desc: "Votre entière satisfaction est notre engagement." },
  { icon: Handshake, title: "Partenaire de confiance", desc: "Un accompagnement durable pour votre réussite." },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Pourquoi nous choisir</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          L&apos;engagement OSZ
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="bg-secondary rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
            <r.icon className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
