import { Users, Award, Handshake, Leaf, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Sélection rigoureuse",
    desc: "Des partenariats directs avec des éleveurs pour une viande bovine et un agneau traçables de l'origine à la livraison.",
  },
  {
    icon: Award,
    title: "Chaîne du froid maîtrisée",
    desc: "Stockage et transport réfrigérés à chaque étape. Votre viande arrive fraîche, quelle que soit la distance.",
  },
  {
    icon: Handshake,
    title: "Réseau local Marrakech",
    desc: "Présents à Marrakech depuis plus de 15 ans, nous connaissons les exigences du marché local et de ses professionnels.",
  },
  {
    icon: Users,
    title: "Livraison fiable",
    desc: "Planning de livraison respecté, réactivité en cas de besoin urgent. Nos clients professionnels comptent sur nous 7j/7.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction client",
    desc: "500+ clients professionnels fidèles. Votre satisfaction est notre engagement quotidien.",
  },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Notre expertise</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          La distribution de viande fraîche de référence à Marrakech
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          OSZ Food Distribution est née de la conviction que la qualité de la viande ne devrait pas être réservée aux seuls grands restaurants. Depuis plus de 15 ans, nous bâtissons des relations durables avec des éleveurs et producteurs sélectionnés pour proposer à Marrakech une viande bovine et un agneau d&apos;une fraîcheur irréprochable.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
          Notre réseau de fournisseurs locaux et notre maîtrise rigoureuse de la chaîne du froid nous permettent de garantir la même qualité — qu&apos;il s&apos;agisse d&apos;une commande à domicile pour une famille de Guéliz ou d&apos;un approvisionnement hebdomadaire pour un hôtel de la Palmeraie.
        </p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
