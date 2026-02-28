import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild size="lg">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </main>
  );
}
