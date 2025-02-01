import Link from "next/link";
import { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Viewer } from "./viewer";

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({
  content,
}: PropsWithChildren<MarkdownViewerProps>) {
  return (
    <Viewer>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a: ({ node, ...props }) =>
            props.href?.startsWith("http") ? (
              <a {...props} target="_blank" rel="noopener noreferrer"></a>
            ) : (
              <Link {...props} href={props.href || "#"} />
            ),
        }}
      >
        {content}
      </Markdown>
    </Viewer>
  );
}
