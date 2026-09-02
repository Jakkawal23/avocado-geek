import type { MetadataRoute } from "next";
import { getAllArticles, getAllGuides, getAllShops, getAllVarieties } from "@/lib/dataLoader";
import { SITE_URL } from "@/lib/seo";

// Auto-generated from the JSON content directories — add a new article,
// variety, shop, or guide file and it appears here automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/articles",
    "/varieties",
    "/shops",
    "/match",
    "/trace",
    "/search",
    "/about",
    "/contact",
  ].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  const varietyRoutes = getAllVarieties().map((v) => ({
    url: `${SITE_URL}/varieties/${v.slug}`,
    lastModified: new Date(),
  }));

  const shopRoutes = getAllShops().map((s) => ({
    url: `${SITE_URL}/shops/${s.slug}`,
    lastModified: new Date(),
  }));

  const guideRoutes = getAllGuides().map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.date ? new Date(g.date) : new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...varietyRoutes, ...shopRoutes, ...guideRoutes];
}
