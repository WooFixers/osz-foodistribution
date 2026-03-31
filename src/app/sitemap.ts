import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE = "https://www.osz-foodistribution.ma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                  priority: 1.0, changeFrequency: "weekly"  },
    { url: `${BASE}/particuliers`,                priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/professionnels`,              priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/particuliers/catalogue`,      priority: 0.8, changeFrequency: "daily"   },
  ];

  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("in_stock", true);

    const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
      url: `${BASE}/particuliers/produit/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    // If DB is unavailable (e.g. during build without env), return static routes only
    return staticRoutes;
  }
}
