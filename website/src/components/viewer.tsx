import Link from "next/link";
import { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ViewerProps {
  content: string;
}

export function Viewer({ content }: PropsWithChildren<ViewerProps>) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
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
    </div>
  );
}
