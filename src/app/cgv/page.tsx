import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <main className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Conditions Générales de Vente</h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Article 1 — Objet</h2>
          <p>Les présentes CGV régissent les ventes de produits alimentaires effectuées par OSZ Food Distribution auprès de ses clients particuliers et professionnels via le site osz-foodistribution.ma.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Article 2 — Commandes</h2>
          <p>Toute commande passée sur le site ou par WhatsApp constitue une acceptation pleine et entière des présentes CGV. OSZ Food Distribution se réserve le droit de refuser toute commande pour des raisons légitimes.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Article 3 — Prix</h2>
          <p>Les prix sont indiqués en Dirhams marocains (MAD), toutes taxes comprises. OSZ Food Distribution se réserve le droit de modifier ses prix à tout moment, les produits étant facturés au tarif en vigueur au moment de la confirmation de commande.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Article 4 — Livraison</h2>
          <p>Les livraisons sont effectuées dans la zone de Marrakech (Guéliz, Hivernage, Palmeraie, Targa et Marrakech centre), du lundi au samedi de 8h à 20h. Les délais de livraison sont communiqués lors de la confirmation de commande.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Article 5 — Réclamations</h2>
          <p>Toute réclamation concernant un produit doit être signalée dans les 24h suivant la livraison, par téléphone au <a href="tel:0670594545" className="text-primary hover:underline">06 70 59 45 45</a> ou par email à <a href="mailto:commande@osz-foodistribution.ma" className="text-primary hover:underline">commande@osz-foodistribution.ma</a>.</p>
        </div>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-primary hover:underline text-sm">← Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
