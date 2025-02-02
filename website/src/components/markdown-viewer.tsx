import Link from "next/link";
import { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Viewer } from "./viewer";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
  existSlugs?: string[];
}

export function MarkdownViewer({
  content,
  existSlugs = [],
}: PropsWithChildren<MarkdownViewerProps>) {
  return (
    <Viewer>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeFormat]}
        remarkRehypeOptions={{
          allowDangerousHtml: true,
        }}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a: ({ node, ...props }) =>
            props.href?.startsWith("http") ? (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(props.className, "flex items-center")}
              >
                {props.children}
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <Link
                {...props}
                className={cn(props.className, {
                  "text-red-500": !existSlugs.includes(
                    props.href?.replace(/^\//, "") || "",
                  ),
                })}
                href={props.href || "#"}
              />
            ),
        }}
      >
        {content}
      </Markdown>
    </Viewer>
  );
}
