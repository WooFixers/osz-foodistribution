import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marc D.",
    role: "Chef de cuisine, Restaurant Le Comptoir",
    text: "OSZ Food Distribution est notre fournisseur depuis 5 ans. La qualité des viandes est irréprochable et les livraisons toujours ponctuelles.",
    stars: 5,
  },
  {
    name: "Sophie L.",
    role: "Directrice, Hôtel Les Terrasses",
    text: "Un partenaire fiable et professionnel. Leur réactivité et la fraîcheur de leurs produits font la différence au quotidien.",
    stars: 5,
  },
  {
    name: "Karim B.",
    role: "Particulier",
    text: "Enfin un accès à des produits de qualité restaurant ! La commande est simple et les produits arrivent toujours frais. Je recommande vivement.",
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
