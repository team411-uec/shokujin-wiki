import { AppHeader } from "@/components/app-header";
import { ArticleViewer } from "@/components/article-viewer";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import strip from "strip-markdown";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
  });
  const plain = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(strip)
    .process(article?.content);
  const description = plain.toString().slice(0, 160).replace(/\n/g, " ");

  return {
    title: decodeURIComponent(slug),
    description: description,
    alternates: {
      canonical: `https://shokujin.com/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
    include: {
      Category: true,
    },
  });

  if (!article) notFound();

  return (
    <>
      <AppHeader />
      <div className="relative">
        <ArticleViewer
          slug={article.slug}
          content={article.content}
          category={article.Category}
          createdAt={article.createdAt}
          updatedAt={article.updatedAt}
        ></ArticleViewer>
        <div className="absolute right-0 top-0 flex space-x-2">
          <Button asChild variant="outline">
            <Link href={`/_edit?slug=${slug}`}>編集</Link>
          </Button>
          <Button asChild variant="destructive">
            <Link href={`/_delete?slug=${slug}`}>削除</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
