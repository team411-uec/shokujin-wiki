import { PropsWithChildren } from "react";
import { MarkdownViewer } from "./markdown-viewer";

interface ArticleViewerProps {
  slug: string;
  content: string;
}

export function ArticleViewer({
  slug,
  content,
}: PropsWithChildren<ArticleViewerProps>) {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>{decodeURIComponent(slug)}</h1>
      <MarkdownViewer content={content} />
    </div>
  );
}
