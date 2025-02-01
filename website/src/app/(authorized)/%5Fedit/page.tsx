import { auth } from "@/auth";
import { AppHeader } from "@/components/app-header";
import { ArticleEditor } from "@/components/article-editor";
import { Button } from "@/components/ui/button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";
async function updateArticle(slug: string, formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { content } = Object.fromEntries(formData);

  await prisma.article.update({
    where: {
      slug: encodeURIComponent(slug),
    },
    data: {
      content: content as string,
    },
  });

  redirect(`/${encodeURIComponent(slug)}`);
}

interface EditArticlePageProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

export default async function EditArticlePage({
  searchParams,
}: EditArticlePageProps) {
  const { slug } = await searchParams;

  const exist = await prisma.article.findUnique({
    where: {
      slug: encodeURIComponent(slug),
    },
  });

  if (!exist) notFound();

  const updateArticleWithSlug = updateArticle.bind(null, slug);

  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>「{decodeURIComponent(slug)}」の編集</h1>
      </Viewer>
      <form action={updateArticleWithSlug} className="mt-4 space-y-4">
        <ArticleEditor defaultValue={exist.content} />
        <Button type="submit">更新</Button>
      </form>
    </>
  );
}
