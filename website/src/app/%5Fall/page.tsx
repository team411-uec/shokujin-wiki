import { AppHeader } from "@/components/app-header";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import { format } from "date-fns";
import { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "すべてのページ",
  alternates: {
    canonical: "https://shokujin.com/_all",
  },
};

export default async function AllPage() {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 100,
  });

  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>すべてのページ</h1>
        <table className="w-fit">
          <tbody>
            {articles.map((article) => (
              <tr key={article.slug}>
                <td>
                  <NextLink href={`/${article.slug}`}>
                    {decodeURIComponent(article.slug)}
                  </NextLink>
                </td>
                <td>{format(article.updatedAt, "yyyy年M月d日")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Viewer>
    </>
  );
}
