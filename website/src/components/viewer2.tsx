import { PropsWithChildren } from "react";

interface ViewerProps {
  slug: string;
  content: string;
}

export function Viewer({ slug, content }: PropsWithChildren<ViewerProps>) {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>{decodeURIComponent(slug)}</h1>
      {content}
    </div>
  );
}
