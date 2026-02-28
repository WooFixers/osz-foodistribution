export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/supabase/types";
import DeleteProductButton from "./DeleteProductButton";
import ExportImportButtons from "./ExportImportButtons";

const CATEGORY_LABELS: Record<string, string> = {
  viandes: "Viandes",
  legumes: "Légumes",
  charcuterie: "Charcuterie",
};

const BADGE_MAP: Record<string, string> = {
  populaire: "Populaire",
  nouveau: "Nouveau",
  offre: "Offre",
};

export default async function ProduitsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Produits</h1>
          <p className="text-muted-foreground mt-1">{products?.length ?? 0} produit{(products?.length ?? 0) !== 1 ? "s" : ""} au catalogue</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportImportButtons />
          <Button asChild>
            <Link href="/woofixers/produits/nouveau">
              <Plus className="w-4 h-4" /> Nouveau produit
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Produit</th>
              <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Catégorie</th>
              <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Prix</th>
              <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Badge</th>
              <th className="text-left p-4 font-semibold text-foreground">Stock</th>
              <th className="text-right p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(products as Product[] | null)?.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] ? (
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-10 rounded-lg bg-muted shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-foreground leading-tight">{product.name}</p>
                      {product.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <span className="font-semibold text-foreground">{product.price} DH</span>
                  <span className="text-muted-foreground"> / {product.unit}</span>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  {product.badge ? (
                    <Badge variant="outline" className="text-xs">{BADGE_MAP[product.badge]}</Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-4">
                  {product.in_stock ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> En stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-destructive text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive" /> Rupture
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/woofixers/produits/${product.id}`}>Modifier</Link>
                    </Button>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-muted-foreground">
                  Aucun produit. <Link href="/woofixers/produits/nouveau" className="text-primary hover:underline">Créez votre premier produit</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
