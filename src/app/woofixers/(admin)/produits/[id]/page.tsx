export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "../ProductForm";
import type { Product } from "@/lib/supabase/types";

export default async function EditProduitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) notFound();

  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Modifier le produit</h1>
      <p className="text-muted-foreground mb-8">{(product as Product).name}</p>
      <ProductForm product={product as Product} />
    </div>
  );
}
