"use client";

import { AppHeader } from "@/components/app-header";
import { Viewer } from "@/components/viewer";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = decodeURIComponent(usePathname());

  if (pathname.startsWith("/_") || pathname.slice(1).includes("/")) {
    // システムページ
    return (
      <>
        <AppHeader />
        <Viewer>
          <h1>404 - Not Found</h1>
        </Viewer>
      </>
    );
  } else {
    // Wikiページ
    const slug = pathname.slice(1);

    return (
      <>
        <AppHeader />
        <Viewer>
          <h1>存在しないページ: {decodeURIComponent(slug)}</h1>
          <p>
            <NextLink href={`/_create?slug=${slug}`}>
              ページを作成するにはここをクリックしてください
            </NextLink>
          </p>
        </Viewer>
      </>
    );
  }
}
