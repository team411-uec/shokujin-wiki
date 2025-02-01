import { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset } from "./ui/sidebar";

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="px-4 pb-8">{children}</SidebarInset>
    </>
  );
}
