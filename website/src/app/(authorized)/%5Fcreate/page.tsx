import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/prisma";
import NextLink from "next/link";
import { redirect } from "next/navigation";

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

  const exist = await prisma.article.findUnique({
    where: {
      slug: encodeURIComponent(slug),
    },
  });

  if (exist)
    return (
      <div>
        <p>すでに「{decodeURIComponent(slug)}」は存在します</p>
        <p>
          <NextLink href={`/${slug}`}>記事を見る</NextLink>
        </p>
      </div>
    );

  const createArticleWithSlug = createArticle.bind(null, slug);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        「{decodeURIComponent(slug)}」の作成
      </h1>
      <form action={createArticleWithSlug} className="mt-4 space-y-4">
        <Textarea
          placeholder="入力してください"
          rows={7}
          className="font-mono"
          name="content"
        />
        <Button type="submit">投稿</Button>
      </form>
    </div>
  );
}
