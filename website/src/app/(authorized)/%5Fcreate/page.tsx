import { auth } from "@/auth";
import { AppHeader } from "@/components/app-header";
import { ArticleEditor } from "@/components/article-editor";
import { Button } from "@/components/ui/button";
import { UploadImageButton } from "@/components/upload-image-button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

async function createArticle(slug: string, formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { content } = Object.fromEntries(formData);
  await prisma.article.create({
    data: {
      slug: encodeURIComponent(slug),
      content: content as string,
      author: {
        connect: {
          id: session.user?.id,
        },
      },
    },
  });

  redirect(`/${encodeURIComponent(slug)}`);
}

interface CreateArticleProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: CreateArticleProps): Promise<Metadata> {
  const { slug } = await searchParams;
  return {
    title: decodeURIComponent(slug) + "の作成",
    alternates: {
      canonical: `https://shokujin.com/_create?slug=${slug}`,
    },
  };
}

export default async function CreateArticlePage({
  searchParams,
}: CreateArticleProps) {
  const { slug } = await searchParams;

  if (slug.includes("/")) {
    notFound();
  }

  const exist = await prisma.article.findUnique({
    where: {
      slug: encodeURIComponent(slug),
    },
    select: {
      slug: true,
    },
  });

  if (exist) redirect(`/_edit?slug=${encodeURIComponent(slug)}`);

  const slugs = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });

  const existSlugs = slugs.map((s) => s.slug);

  const createArticleWithSlug = createArticle.bind(null, slug);

  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>ページ: {decodeURIComponent(slug)}の作成</h1>
      </Viewer>
      <form action={createArticleWithSlug} className="mt-4 space-y-4">
        <div className="fixed bottom-4 right-4 space-x-4">
          <UploadImageButton />
          <Button type="submit">投稿</Button>
        </div>
        <ArticleEditor defaultValue="" existSlugs={existSlugs} />
      </form>
    </>
  );
}
