import { BaseLayout } from "@/components/base-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "食神Wiki",
    template: "%s | 食神Wiki",
  },
  description: "食神Wikiは、食神のメニューや豆知識をまとめたサイトです。",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <GoogleAnalytics
        gaId={
          process.env.NODE_ENV === "production"
            ? (process.env.GA_ID as string)
            : ""
        }
      />
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
