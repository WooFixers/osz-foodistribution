import { ShieldCheck, Thermometer, FileSearch, ClipboardCheck, Truck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Conformité ONSSA", desc: "Respect strict de la Loi n° 28-07 sur la sécurité sanitaire des aliments au Maroc." },
  { icon: Thermometer, title: "Chaîne du froid certifiée", desc: "Transport frigorifique sous température dirigée avec véhicules agréés ONSSA." },
  { icon: FileSearch, title: "Traçabilité intégrale", desc: "Lots issus d'abattoirs agréés au Maroc avec estampillage et traçabilité documentée." },
  { icon: ClipboardCheck, title: "Contrôle vétérinaire", desc: "Certificats de salubrité vétérinaire et autocontrôles systématiques." },
  { icon: Truck, title: "Livraison Marrakech & Régions", desc: "Distribution rapide et sécurisée respectant le plan de maîtrise sanitaire." },
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
        <p className="text-primary-foreground/60 uppercase tracking-[0.25em] text-sm font-semibold mb-3">Qualité &amp; Conformité Sanitaire Maroc</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-5">
          Sécurité sanitaire certifiée ONSSA
        </h2>
        <p className="text-primary-foreground/70 text-lg leading-relaxed">
          Chaque produit distribué par OSZ Food Distribution répond rigoureusement aux normes sanitaires marocaines édictées par l&apos;ONSSA et à la Loi n° 28-07 relative à la sécurité sanitaire des produits alimentaires. Toutes nos viandes proviennent d&apos;abattoirs agréés et font l&apos;objet d&apos;un contrôle vétérinaire officiel de salubrité.
        </p>
        <p className="text-primary-foreground/70 text-lg leading-relaxed mt-4">
          Pour vos audits internes et les contrôles des commissions d&apos;hygiène à Marrakech, nous fournissons sur simple demande l&apos;ensemble des certificats de salubrité vétérinaire et fiches de traçabilité ONSSA.
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
