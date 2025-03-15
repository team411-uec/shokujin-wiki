"use client";

import { Tab, Tabs } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export function AuthTabs() {
  const pathname = usePathname();

  return (
    <Tabs aria-label="ログイン・新規登録" value={pathname} variant="fullWidth">
      <Tab
        label="ログイン"
        component={NextLink}
        href="/signin"
        value="/signin"
      />
      <Tab
        label="新規登録"
        component={NextLink}
        href="/signup"
        value="/signup"
      />
    </Tabs>
  );
}
