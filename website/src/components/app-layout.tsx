import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

import { AppHeader } from "./app-header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <Container>{children}</Container>
    </>
  );
}
