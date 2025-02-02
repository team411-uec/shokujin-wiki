import { prisma } from "@/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return [
    ...articles.map((article) => ({
      url: `https://shokujin.com/${article.slug}`,
      lastModified: article.updatedAt,
      priority: 0.8,
    })),
  ];
}
