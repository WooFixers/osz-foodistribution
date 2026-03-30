import { ShieldCheck, Thermometer, FileSearch, ClipboardCheck, Truck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Normes sanitaires", desc: "Respect strict de toutes les réglementations sanitaires en vigueur." },
  { icon: Thermometer, title: "Chaîne du froid", desc: "Maîtrise rigoureuse de la chaîne du froid à chaque étape." },
  { icon: FileSearch, title: "Traçabilité", desc: "Traçabilité complète de chaque produit, de l'origine à la livraison." },
  { icon: ClipboardCheck, title: "Contrôle qualité", desc: "Processus de contrôle qualité stricts et réguliers." },
  { icon: Truck, title: "Logistique fiable", desc: "Une logistique optimisée pour des livraisons rapides et sécurisées." },
];

const QualitySection = () => (
  <section id="quality" className="relative section-padding overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/quality-bg.jpg')" }}
    />
    <div className="absolute inset-0 bg-primary-dark/92" />
    <div className="relative container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary-foreground/60 uppercase tracking-[0.25em] text-sm font-semibold mb-3">Qualité &amp; Conformité</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">
          La sécurité alimentaire, notre engagement
        </h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed">
          Chaque produit distribué par OSZ Food Distribution répond aux standards sanitaires en vigueur au Maroc. Normes HACCP appliquées à chaque étape de notre chaîne, traçabilité complète de l&apos;origine à la livraison, contrôle qualité systématique à la réception et au départ.
        </p>
        <p className="text-primary-foreground/70 text-lg leading-relaxed mt-4">
          Pour nos clients professionnels (restaurants, hôtels, riads), nous fournissons sur demande toute la documentation sanitaire requise par les autorités compétentes.
        </p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {items.map((item) => (
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

export default QualitySection;
