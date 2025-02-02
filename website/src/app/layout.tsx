import { BaseLayout } from "@/components/base-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "食神Wiki",
    template: "%s | 食神Wiki",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <BaseLayout>{children}</BaseLayout>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
