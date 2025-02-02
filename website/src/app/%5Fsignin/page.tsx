import { auth } from "@/auth";
import { SigninForm } from "./_components/signin-form";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { Metadata } from "next";
import { Viewer } from "@/components/viewer";

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
          <Viewer>
            <small>
              <ol>
                <li>
                  本サービスは、ユーザーの個人情報を第三者に提供することはありません。
                </li>
                <li>
                  連携先から得られるメールアドレスを含む個人情報については、ユーザーの識別にのみ使用します。ログインすることによりこれらに同意することとします。
                </li>
                <li>
                  LINEログインに失敗する場合、メールアドレスの登録をした上でログイン時にメールアドレスの共有を有効にしてください。
                </li>
              </ol>
            </small>
          </Viewer>
        </div>
      </div>
    </>
  );
}
