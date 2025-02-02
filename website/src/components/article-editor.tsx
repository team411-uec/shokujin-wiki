"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { MarkdownViewer } from "./markdown-viewer";

interface ArticleEditorProps {
  defaultValue: string;
  existSlugs: string[];
}

export function ArticleEditor({
  defaultValue,
  existSlugs,
}: ArticleEditorProps) {
  const [content, setContent] = useState(defaultValue);

  return (
    <div className="grid h-[calc(100svh-120px)] grid-cols-2 gap-4">
      <Textarea
        placeholder="入力してください"
        className="font-mono"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="overflow-y-auto">
        <MarkdownViewer
          content={content || "入力してください"}
          existSlugs={existSlugs}
        />
      </div>
    </div>
  );
}
