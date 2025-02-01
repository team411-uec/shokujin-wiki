import { PropsWithChildren } from "react";
import { Viewer } from "./viewer";

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
      <Viewer content={content} />
    </div>
  );
}
