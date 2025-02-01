import { AppHeader } from "@/components/app-header";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import NextLink from "next/link";

export default async function AllPage() {
  const articles = await prisma.article.findMany();
  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>すべての記事</h1>
        <ul>
          {articles
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((article) => (
              <li key={article.id}>
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
