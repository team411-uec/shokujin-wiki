import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/prisma";
import NextLink from "next/link";
import { redirect } from "next/navigation";

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

  if (!exist) {
    return (
      <div>
        <p>「{decodeURIComponent(slug)}」は存在しません</p>
        <p>
          <NextLink href={`/_create?slug=${slug}`}>記事を作成する</NextLink>
        </p>
      </div>
    );
  }

  const updateArticleWithSlug = updateArticle.bind(null, slug);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        「{decodeURIComponent(slug)}」の編集
      </h1>
      <form action={updateArticleWithSlug} className="mt-4 space-y-4">
        <Textarea
          placeholder="入力してください"
          rows={7}
          className="font-mono"
          name="content"
          defaultValue={exist.content}
        />
        <Button type="submit">更新</Button>
      </form>
    </div>
  );
}
