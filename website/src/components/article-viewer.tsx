import { prisma } from "@/prisma";
import { MarkdownViewer } from "./markdown-viewer";
import { Viewer } from "./viewer";
import { format } from "date-fns";

interface ArticleViewerProps {
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function ArticleViewer({
  slug,
  content,
  createdAt,
  updatedAt,
}: ArticleViewerProps) {
  const slugs = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });

  const existSlugs = slugs.map((s) => s.slug);

  return (
    <Viewer>
      <h1 className="mb-0">{decodeURIComponent(slug)}</h1>
      <p className="my-0 text-right">
        <small>
          作成: {format(createdAt, "yyyy年M月d日")}{" "}
          {updatedAt !== createdAt && (
            <>最終更新: {format(updatedAt, "yyyy年M月d日")}</>
          )}
        </small>
      </p>
      <MarkdownViewer content={content} existSlugs={existSlugs} />
    </Viewer>
  );
}
