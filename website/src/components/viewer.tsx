import { PropsWithChildren } from "react";

export function Viewer({ children }: PropsWithChildren) {
  return (
    <div className="prose prose-slate prose-indigo max-w-none break-all dark:prose-blue dark:prose-invert">
      {children}
    </div>
  );
}
