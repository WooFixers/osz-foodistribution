import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chef de cuisine",
    role: "Restaurant, Marrakech",
    text: "OSZ est notre fournisseur de viande depuis 5 ans. La qualité du bœuf et de l'agneau est constante, les livraisons toujours à l'heure. C'est exactement ce dont une cuisine professionnelle a besoin.",
    stars: 5,
  },
  {
    name: "Directeur F&B",
    role: "Hôtel, Palmeraie Marrakech",
    text: "Fiabilité, qualité et réactivité. Trois mots qui résument notre collaboration avec OSZ. Depuis 8 ans, ils approvisionnent notre établissement sans jamais nous faire défaut.",
    stars: 5,
  },
  {
    name: "Particulier",
    role: "Guéliz",
    text: "Je commande ma viande chez OSZ depuis que je les connais. La fraîcheur est irréprochable et le service WhatsApp est très pratique. Je recommande à tous mes voisins de Guéliz.",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-cream">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-3">Témoignages</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Ils nous font confiance
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
        <span className="font-heading text-2xl font-bold text-foreground">500+ clients</span>
        <span className="w-px h-8 bg-border hidden sm:block" />
        <span className="font-heading text-2xl font-bold text-foreground hidden sm:block">98% satisfaction</span>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
