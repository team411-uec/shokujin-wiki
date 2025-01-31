import { PropsWithChildren } from "react";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
