import { auth } from "@/auth";
import { AppHeader } from "@/components/app-header";
import { ArticleViewer } from "@/components/article-viewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

async function deleteArticle(slug: string) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.article.delete({
    where: {
      slug: encodeURIComponent(slug),
    },
  });

  redirect("/");
}

interface DeleteArticlePageProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: DeleteArticlePageProps): Promise<Metadata> {
  const { slug } = await searchParams;
  return {
    title: decodeURIComponent(slug) + "の削除",
    alternates: {
      canonical: `https://shokujin.com/_delete?slug=${slug}`,
    },
  };
}

export default async function DeleteArticlePage({
  searchParams,
}: DeleteArticlePageProps) {
  const { slug } = await searchParams;

  const exist = await prisma.article.findUnique({
    where: {
      slug: encodeURIComponent(slug),
    },
  });

  if (!exist) notFound();

  const deleteArticleWithSlug = deleteArticle.bind(null, slug);

  return (
    <>
      <AppHeader />
      <Alert
        variant="destructive"
        className="sticky top-4 z-10 w-fit bg-background"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>ページ削除Ï: {decodeURIComponent(slug)}</AlertTitle>
        <AlertDescription className="flex items-end gap-2">
          <div>
            以下のページを削除します。確定するには削除ボタンをクリックしてください。
          </div>
          <form action={deleteArticleWithSlug}>
            <Button type="submit" variant="destructive">
              削除
            </Button>
          </form>
        </AlertDescription>
      </Alert>
      <div className="mt-8">
        <ArticleViewer
          slug={exist.slug}
          content={exist.content}
          createdAt={exist.createdAt}
          updatedAt={exist.updatedAt}
        />
      </div>
    </>
  );
}
