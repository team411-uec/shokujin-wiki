import { PropsWithChildren } from "react";

export function Viewer({ children }: PropsWithChildren) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-indigo dark:prose-blue">
      {children}
    </div>
  );
}
