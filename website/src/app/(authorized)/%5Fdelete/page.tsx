import { auth } from "@/auth";
import { ArticleViewer } from "@/components/article-viewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

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

export default async function DeleteArticlePage({
  searchParams,
}: DeleteArticlePageProps) {
  const { slug } = await searchParams;

  const exist = await prisma.article.findUnique({
    where: {
      slug: encodeURIComponent(slug),
    },
  });

  if (!exist) {
    return (
      <div>
        <p>「{decodeURIComponent(slug)}」は存在しません</p>
      </div>
    );
  }

  const deleteArticleWithSlug = deleteArticle.bind(null, slug);

  return (
    <div>
      <Alert variant="destructive" className="sticky top-4 w-fit bg-background">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>「{decodeURIComponent(slug)}」の削除</AlertTitle>
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
        <ArticleViewer slug={exist.slug} content={exist.content} />
      </div>
    </div>
  );
}
