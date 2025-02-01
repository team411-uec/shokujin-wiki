"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Viewer } from "./viewer";

interface ArticleEditorProps {
  defaultValue: string;
}

export function ArticleEditor({ defaultValue }: ArticleEditorProps) {
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
        <Viewer content={content || "入力してください"} />
      </div>
    </div>
  );
}
