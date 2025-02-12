import { prisma } from "@/prisma";
import { MarkdownViewer } from "./markdown-viewer";
import { Viewer } from "./viewer";
import { format } from "date-fns";
import { Category } from "@prisma/client";
import { Badge } from "./ui/badge";

interface ArticleViewerProps {
  slug: string;
  content: string;
  category: Category | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function ArticleViewer({
  slug,
  content,
  category,
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
      <div className="my-0 flex items-start">
        {category && (
          <Badge variant="outline" className="mt-2">
            {category.name}
          </Badge>
        )}
        <small className="ml-auto">
          作成: {format(createdAt, "yyyy年M月d日")}{" "}
          {updatedAt !== createdAt && (
            <>最終更新: {format(updatedAt, "yyyy年M月d日")}</>
          )}
        </small>
      </div>
      <MarkdownViewer content={content} existSlugs={existSlugs} />
    </Viewer>
  );
}
