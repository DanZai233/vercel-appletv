import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vercel-appletv.vercel.app";

  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
