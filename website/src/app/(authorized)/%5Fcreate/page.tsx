import { auth } from "@/auth";
import { AppHeader } from "@/components/app-header";
import { ArticleEditor } from "@/components/article-editor";
import { Button } from "@/components/ui/button";
import { UploadImageButton } from "@/components/upload-image-button";
import { Viewer } from "@/components/viewer";
import { prisma } from "@/prisma";
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
      <div className="flex items-start justify-between">
        <Viewer>
          <h1>ページ: {decodeURIComponent(slug)}の作成</h1>
        </Viewer>
        <UploadImageButton />
      </div>
      <form action={createArticleWithSlug} className="mt-4 space-y-4">
        <ArticleEditor defaultValue="" existSlugs={existSlugs} />
        <Button type="submit">投稿</Button>
      </form>
    </>
  );
}
