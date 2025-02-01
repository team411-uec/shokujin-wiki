import { Button } from "@/components/ui/button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!article) {
    return (
      <div className="prose prose-slate max-w-none">
        <h1>Article not found</h1>
        <p>
          The article you are looking for does not exist. Please check the URL
          and try again.
        </p>
        <p>
          <Link href={`/_create?slug=${slug}`}>
            「{decodeURIComponent(slug)}
            」を作成するにはここをクリックしてください
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Viewer slug={article.slug} content={article.content}></Viewer>
      <div className="absolute right-0 top-0 flex space-x-2">
        <Button asChild variant="outline">
          <Link href={`/_edit?slug=${slug}`}>編集</Link>
        </Button>
        <Button asChild variant="destructive">
          <Link href={`/_delete?slug=${slug}`}>削除</Link>
        </Button>
      </div>
    </div>
  );
}
