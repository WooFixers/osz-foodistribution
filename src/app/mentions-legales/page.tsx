import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Mentions légales</h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Éditeur du site</h2>
          <p>OSZ Food Distribution<br />
          Marrakech, Maroc<br />
          Téléphone : <a href="tel:0670594545" className="text-primary hover:underline">06 70 59 45 45</a><br />
          Email : <a href="mailto:commande@osz-foodistribution.ma" className="text-primary hover:underline">commande@osz-foodistribution.ma</a></p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive d&apos;OSZ Food Distribution. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
        </div>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-primary hover:underline text-sm">← Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
