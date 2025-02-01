import { auth } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, List, Shuffle } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { AccountMenu } from "./account-menu";
import ModeToggle from "./mode-toggle";

const items = [
  {
    title: "メインページ",
    url: "/",
    icon: Home,
  },
  {
    title: "ランダムページ",
    url: "/_random",
    icon: Shuffle,
  },
  {
    title: "すべてのページ",
    url: "/_all",
    icon: List,
  },
];

export async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarHeader>
        <NextLink href="/" className="px-8 py-4">
          <Image
            alt=""
            src="/logo.svg"
            width={512}
            height={512}
            className="h-auto w-full"
            // style={{
            //   filter: "drop-shadow(1px 1px 5px rgba(255, 200, 0, 0.9))",
            // }}
          />
        </NextLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NextLink href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NextLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            {session ? (
              <AccountMenu user={session.user} />
            ) : (
              <SidebarMenuButton asChild>
                <NextLink href="/_signin">新規登録・ログイン</NextLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
