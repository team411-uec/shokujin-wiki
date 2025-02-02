"use client";

import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { MarkdownViewer } from "./markdown-viewer";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye, Pencil } from "lucide-react";

interface ArticleEditorProps {
  defaultValue: string;
  existSlugs: string[];
}

export function ArticleEditor({
  defaultValue,
  existSlugs,
}: ArticleEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setPreview(false);
  }, [isMobile]);

  return (
    <>
      <div className="fixed bottom-4 left-4 md:hidden">
        <Button onClick={() => setPreview(!preview)} type="button">
          {preview ? <Pencil /> : <Eye />}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {preview ? (
          <MarkdownViewer
            content={content || "入力してください"}
            existSlugs={existSlugs}
          />
        ) : (
          <Textarea
            placeholder="入力してください"
            className="h-[calc(100svh-120px)] font-mono"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        <div className="hidden overflow-y-auto md:block">
          <MarkdownViewer
            content={content || "入力してください"}
            existSlugs={existSlugs}
          />
        </div>
      </div>
    </>
  );
}
