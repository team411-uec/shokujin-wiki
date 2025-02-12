import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ComponentProps, ElementType, PropsWithChildren } from "react";
import Markdown, { ExtraProps } from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeFormat from "rehype-format";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Viewer } from "./viewer";

const tweetUrlRegex = /^https?:\/\/x\.com\/\w+\/status\/(\d+)$/;

interface MarkdownViewerProps {
  content: string;
  existSlugs?: string[];
}

export function MarkdownViewer({
  content,
  existSlugs = [],
}: PropsWithChildren<MarkdownViewerProps>) {
  const anchorRenderer: {
    [Key in Extract<ElementType, string>]?: ElementType<
      ComponentProps<Key> & ExtraProps
    >;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }["a"] = ({ node, ...props }) => {
    const href = props.href;
    if (href && tweetUrlRegex.test(href)) {
      const tweetId = href.match(tweetUrlRegex)?.[1];
      if (!tweetId) return null;
      return <Tweet id={tweetId} />;
    } else if (href?.startsWith("http")) {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(props.className, "flex items-center")}
        >
          {props.children}
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      );
    } else if (href?.startsWith("#")) {
      return <a {...props} />;
    } else {
      return (
        <Link
          {...props}
          className={cn(props.className, {
            "text-red-500": !existSlugs.includes(
              props.href?.replace(/^\//, "") || "",
            ),
          })}
          href={props.href || "#"}
        />
      );
    }
  };

  const parahraphRenderer: {
    [Key in Extract<ElementType, string>]?: ElementType<
      ComponentProps<Key> & ExtraProps
    >;
  }["p"] = ({ node, className, ...props }) => {
    const children = node?.children;
    const anchor = children?.[0];
    const href =
      anchor?.type === "element" && typeof anchor.properties.href === "string"
        ? anchor.properties.href
        : "";

    if (
      children?.length === 1 &&
      anchor?.type === "element" &&
      anchor.tagName === "a" &&
      tweetUrlRegex.test(href)
    ) {
      return <div {...props} className={cn(className, "not-prose")} />;
    } else {
      return <p {...props} />;
    }
  };

  return (
    <Viewer>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeSanitize,
            {
              ...defaultSchema,
              attributes: {
                ...defaultSchema.attributes,
                div: [
                  ...(defaultSchema.attributes?.div || []),
                  ["className", "widget", "grid-layout"],
                ],
              },
              clobberPrefix: "",
            },
          ],
          rehypeKatex,
          rehypeUnwrapImages,
          rehypeSlug,
          rehypeFormat,
        ]}
        remarkRehypeOptions={{
          allowDangerousHtml: true,
        }}
        components={{
          a: anchorRenderer,
          p: parahraphRenderer,
        }}
      >
        {content}
      </Markdown>
    </Viewer>
  );
}
