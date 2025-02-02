import { auth } from "@/auth";
import { SigninForm } from "./_components/signin-form";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
  alternates: {
    canonical: "https://shokujin.com/_signin",
  },
};

export default async function SigninPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <AppHeader />
      <div className="flex items-center justify-center">
        <div className="max-w-md pt-16">
          <SigninForm />
        </div>
      </div>
    </>
  );
}
