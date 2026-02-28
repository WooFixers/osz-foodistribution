import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/compte/", "/woofixers/"],
      },
    ],
    sitemap: "https://www.osz-foodistribution.ma/sitemap.xml",
  };
}
