import type { MetadataRoute } from "next";

const BASE = "https://www.osz-foodistribution.ma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only active canonical routes while B2C is temporarily disabled
  const activeRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                      priority: 1.0, changeFrequency: "weekly"  },
    { url: `${BASE}/professionnels`,  priority: 0.9, changeFrequency: "weekly" },
  ];

  /*
   * NOTE: B2C routes temporarily disabled. Re-enable when B2C is back online:
   *
   * const b2cStatic: MetadataRoute.Sitemap = [
   *   { url: `${BASE}/particuliers`,           priority: 0.9, changeFrequency: "monthly" },
   *   { url: `${BASE}/particuliers/catalogue`, priority: 0.8, changeFrequency: "daily"   },
   * ];
   *
   * try {
   *   const { createClient } = await import("@/lib/supabase/server");
   *   const supabase = await createClient();
   *   const { data: products } = await supabase
   *     .from("products")
   *     .select("slug, updated_at")
   *     .eq("in_stock", true)
   *     .eq("is_active", true);
   *
   *   const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
   *     url: `${BASE}/particuliers/produit/${p.slug}`,
   *     lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
   *     changeFrequency: "weekly",
   *     priority: 0.7,
   *   }));
   *   return [...activeRoutes, ...b2cStatic, ...productRoutes];
   * } catch {
   *   return [...activeRoutes, ...b2cStatic];
   * }
   */

  return activeRoutes;
}

