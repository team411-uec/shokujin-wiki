import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthorizedLayout({
  children,
}: PropsWithChildren) {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  return <>{children}</>;
}
