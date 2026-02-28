export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mes commandes",
  robots: { index: false, follow: false },
};
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Package, ShoppingBag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/supabase/types";
import SignOutButton from "./SignOutButton";

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  new: { label: "Nouvelle", variant: "default" },
  read: { label: "En cours", variant: "secondary" },
  replied: { label: "Traitée", variant: "outline" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function CommandesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/compte/connexion");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/compte/profil" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" /> Mon profil
            </Link>
            <Link href="/compte/commandes" className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShoppingBag className="w-4 h-4" /> Mes commandes
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-12 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Mes commandes</h1>
        <p className="text-muted-foreground mb-8">Historique de vos commandes passées.</p>

        {!orders || orders.length === 0 ? (
          <div className="bg-background rounded-xl border border-border shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Aucune commande</h2>
            <p className="text-muted-foreground mb-6">Vous n&apos;avez pas encore passé de commande.</p>
            <Link
              href="/particuliers/catalogue"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Découvrir le catalogue
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {(orders as Order[]).map((order) => {
              const status = STATUS_MAP[order.status] ?? STATUS_MAP.new;
              return (
                <details key={order.id} className="bg-background rounded-xl border border-border shadow-sm group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          Commande du {formatDate(order.created_at)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items?.length ?? 0} article{(order.items?.length ?? 0) !== 1 ? "s" : ""} · {order.total ?? 0} DH
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <svg className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="sm:col-span-2"><span className="font-medium text-foreground">Adresse : </span>{order.adresse}</div>
                      {order.creneau && <div><span className="font-medium text-foreground">Créneau : </span>{order.creneau}</div>}
                      {order.notes && <div><span className="font-medium text-foreground">Notes : </span>{order.notes}</div>}
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b border-border">
                          <th className="text-left py-2">Produit</th>
                          <th className="text-center py-2">Qté</th>
                          <th className="text-right py-2">Prix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.items ?? []).map((item, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            <td className="py-2">{item.name}</td>
                            <td className="py-2 text-center">{item.qty}</td>
                            <td className="py-2 text-right">{item.price * item.qty} DH</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="font-semibold">
                          <td colSpan={2} className="pt-3">Total</td>
                          <td className="pt-3 text-right text-primary">{order.total} DH</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
