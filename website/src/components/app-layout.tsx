import type { PropsWithChildren } from "react";

import { AppHeader } from "./app-header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
