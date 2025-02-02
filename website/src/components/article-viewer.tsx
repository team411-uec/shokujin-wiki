import { PropsWithChildren } from "react";
import { MarkdownViewer } from "./markdown-viewer";
import { Viewer } from "./viewer";
import { prisma } from "@/prisma";

interface ArticleViewerProps {
  slug: string;
  content: string;
}

export async function ArticleViewer({
  slug,
  content,
}: PropsWithChildren<ArticleViewerProps>) {
  const slugs = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });

  const existSlugs = slugs.map((s) => s.slug);

  return (
    <Viewer>
      <h1>{decodeURIComponent(slug)}</h1>
      <MarkdownViewer content={content} existSlugs={existSlugs} />
    </Viewer>
  );
}
