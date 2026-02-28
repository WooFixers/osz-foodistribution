import { Users, Award, Handshake, Leaf, ThumbsUp } from "lucide-react";

const features = [
  { icon: Users, title: "Équipe expérimentée", desc: "Des spécialistes passionnés de la distribution alimentaire à votre service." },
  { icon: Award, title: "Expertise reconnue", desc: "Des années d'expérience dans le secteur agroalimentaire." },
  { icon: Handshake, title: "Réseau de fournisseurs", desc: "Un réseau solide de producteurs et éleveurs sélectionnés." },
  { icon: Leaf, title: "Fraîcheur garantie", desc: "Un engagement quotidien pour la qualité et la fraîcheur de chaque produit." },
  { icon: ThumbsUp, title: "Satisfaction client", desc: "Votre satisfaction est notre priorité absolue." },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Notre expertise</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          L&apos;excellence au service de votre activité
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          OSZ Food Distribution réunit une équipe de professionnels dédiés, forts de nombreuses années d&apos;expérience dans la distribution alimentaire.
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
