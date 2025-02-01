import { PropsWithChildren } from "react";

export function Viewer({ children }: PropsWithChildren) {
  return <div className="prose prose-slate max-w-none">{children}</div>;
}
