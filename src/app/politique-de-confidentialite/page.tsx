import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Politique de confidentialité</h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Données collectées</h2>
          <p>OSZ Food Distribution collecte uniquement les données nécessaires au traitement de vos commandes et demandes de devis : nom, prénom, téléphone, adresse de livraison et email.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour le traitement de vos commandes, la communication relative à vos livraisons, et l&apos;amélioration de nos services. Elles ne sont jamais cédées à des tiers.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Vos droits</h2>
          <p>Conformément à la loi marocaine 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:commande@osz-foodistribution.ma" className="text-primary hover:underline">commande@osz-foodistribution.ma</a>.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Cookies</h2>
          <p>Ce site utilise des cookies techniques nécessaires au bon fonctionnement du panier et de l&apos;authentification. Aucun cookie publicitaire n&apos;est déposé sans votre consentement.</p>
        </div>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-primary hover:underline text-sm">← Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
