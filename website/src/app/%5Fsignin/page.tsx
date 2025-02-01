import { auth } from "@/auth";
import { SigninForm } from "./_components/signin-form";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-md">
        <SigninForm />
      </div>
    </div>
  );
}
