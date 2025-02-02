import { AppHeader } from "@/components/app-header";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import NextLink from "next/link";

export default async function AllPage() {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>すべてのページ</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <NextLink href={`/${article.slug}`}>
                {decodeURIComponent(article.slug)}
              </NextLink>
            </li>
          ))}
        </ul>
      </Viewer>
    </>
  );
}
