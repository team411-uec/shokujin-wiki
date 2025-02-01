import { PropsWithChildren } from "react";
import { MarkdownViewer } from "./markdown-viewer";
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
    <Viewer>
      <h1>{decodeURIComponent(slug)}</h1>
      <MarkdownViewer content={content} />
    </Viewer>
  );
}
