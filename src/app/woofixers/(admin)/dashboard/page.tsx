export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Package, MessageSquare, ShoppingCart, FileText } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: productsCount },
    { count: quotesCount },
    { count: ordersCount },
    { count: contactsCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const stats = [
    { label: "Produits", value: productsCount ?? 0, icon: Package, color: "text-primary bg-primary/10" },
    { label: "Devis en attente", value: quotesCount ?? 0, icon: FileText, color: "text-amber-600 bg-amber-50" },
    { label: "Commandes nouvelles", value: ordersCount ?? 0, icon: ShoppingCart, color: "text-green-600 bg-green-50" },
    { label: "Messages non lus", value: contactsCount ?? 0, icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Tableau de bord</h1>
      <p className="text-muted-foreground mb-8">Bienvenue dans l&apos;espace administration.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-background rounded-xl border border-border p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
