import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
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
      <h1>「{decodeURIComponent(slug)}」の削除</h1>
      <p>
        以下のページを削除します。確定するには以下のボタンをクリックしてください。
      </p>
      <form action={deleteArticleWithSlug}>
        <Button type="submit" variant="destructive">
          削除
        </Button>
      </form>
      <Viewer slug={exist.slug} content={exist.content}></Viewer>
    </div>
  );
}
