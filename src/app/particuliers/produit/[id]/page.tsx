import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductDetailClient, { type Product } from "@/components/ProductDetailClient";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", id)
    .single();

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: `${product.name} — Livraison à Marrakech`,
    description:
      product.description ??
      `Commandez ${product.name} en ligne. Livraison fraîche à domicile à Marrakech.`,
    alternates: {
      canonical: `https://www.osz-foodistribution.ma/particuliers/produit/${id}`,
    },
    openGraph: {
      title: `${product.name} | OSZ Food Distribution`,
      description:
        product.description ??
        `Commandez ${product.name} en ligne. Livraison fraîche à domicile à Marrakech.`,
    },
  };
}

export default async function ProductDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, description, long_description, price, unit, category, in_stock, badge, images, rating, origin, weight, storage_instructions, suggestions")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const { data: related } = await supabase
    .from("products")
    .select("id, name, description, price, unit, category, in_stock, badge, images, rating")
    .eq("category", product.category)
    .neq("id", id)
    .limit(4);

  return (
    <ProductDetailClient
      product={product as Product}
      related={(related as Product[]) ?? []}
    />
  );
}
