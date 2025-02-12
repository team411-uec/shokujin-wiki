import { auth } from "@/auth";
import { AppHeader } from "@/components/app-header";
import { ArticleEditor } from "@/components/article-editor";
import { Button } from "@/components/ui/button";
import { UploadImageButton } from "@/components/upload-image-button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

async function updateArticle(slug: string, formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { content, categoryId } = Object.fromEntries(formData);

  await prisma.article.update({
    where: {
      slug: encodeURIComponent(slug),
    },
    data: {
      content: content as string,
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
    },
  });

  redirect(`/${encodeURIComponent(slug)}`);
}

interface EditArticlePageProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: EditArticlePageProps): Promise<Metadata> {
  const { slug } = await searchParams;
  return {
    title: decodeURIComponent(slug) + "の編集",
    alternates: {
      canonical: `https://shokujin.com/_edit?slug=${slug}`,
    },
  };
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

  const slugs = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });

  const existSlugs = slugs.map((s) => s.slug);

  const categories = await prisma.category.findMany({
    include: {
      articles: {
        select: {
          id: true,
        },
      },
    },
  });

  const articleCategories = categories.map((c) => ({
    value: c.id + "",
    label: c.name,
    articleCount: c.articles.length,
  }));

  const updateArticleWithSlug = updateArticle.bind(null, slug);

  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>ページ編集: {decodeURIComponent(slug)}</h1>
      </Viewer>
      <form action={updateArticleWithSlug} className="mt-4 space-y-4">
        <div className="fixed bottom-4 right-4 z-10 space-x-4">
          <UploadImageButton />
          <Button type="submit">更新</Button>
        </div>
        <ArticleEditor
          defaultValue={exist.content}
          existSlugs={existSlugs}
          categories={articleCategories}
          defaultCategoryId={exist.categoryId || undefined}
        />
      </form>
    </>
  );
}
