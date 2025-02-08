import { PropsWithChildren } from "react";

export function Viewer({ children }: PropsWithChildren) {
  return (
    <div className="prose prose-slate prose-indigo max-w-none break-all dark:prose-blue dark:prose-invert prose-h1:border-b-2 prose-h1:pb-2 prose-h2:border-b prose-h2:pb-2">
      {children}
    </div>
  );
}
