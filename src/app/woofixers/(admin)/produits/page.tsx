export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/supabase/types";
import DeleteProductButton from "./DeleteProductButton";
import ToggleProductStatusButton from "./ToggleProductStatusButton";
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

  const productList = (products as Product[] | null) ?? [];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Produits</h1>
          <p className="text-muted-foreground mt-1">{productList.length} produit{productList.length !== 1 ? "s" : ""} au catalogue</p>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <ExportImportButtons />
          <Button asChild>
            <Link href="/woofixers/produits/nouveau">
              <Plus className="w-4 h-4" /> Nouveau produit
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">

        {/* Mobile card list */}
        {productList.length === 0 ? (
          <p className="p-12 text-center text-muted-foreground">
            Aucun produit.{" "}
            <Link href="/woofixers/produits/nouveau" className="text-primary hover:underline">
              Créez votre premier produit
            </Link>.
          </p>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-border">
              {productList.map((product) => (
                <li key={product.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
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
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground leading-tight truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {CATEGORY_LABELS[product.category] ?? product.category}
                        {product.price ? ` · ${product.price} DH / ${product.unit}` : ""}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {product.in_stock ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> En stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-destructive text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" /> Rupture
                        </span>
                      )}
                      {product.is_active ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /> Désactivé
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/woofixers/produits/${product.id}`}>Modifier</Link>
                    </Button>
                    <ToggleProductStatusButton productId={product.id} isActive={product.is_active} />
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop table */}
            <table className="hidden md:table w-full text-sm">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Produit</th>
                  <th className="text-left p-4 font-semibold text-foreground">Catégorie</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Prix</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Badge</th>
                  <th className="text-left p-4 font-semibold text-foreground">Stock</th>
                  <th className="text-left p-4 font-semibold text-foreground">État</th>
                  <th className="text-right p-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {productList.map((product) => (
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
                    <td className="p-4 text-muted-foreground">
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
                    <td className="p-4">
                      {product.is_active ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /> Désactivé
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/woofixers/produits/${product.id}`}>Modifier</Link>
                        </Button>
                        <ToggleProductStatusButton productId={product.id} isActive={product.is_active} />
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
