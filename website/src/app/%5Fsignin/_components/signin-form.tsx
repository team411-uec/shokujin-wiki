import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SigninGithubButton } from "./signin-github-button";
import { SigninGoogleButton } from "./signin-google-button";
import { SigninTwitterButton } from "./signin-twitter-button";
import { SigninLineButton } from "./signin-line-button";

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">新規登録・ログイン</CardTitle>
          <CardDescription>
            アカウントに新規登録・ログインするには、いずれかのボタンをクリックしてください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <SigninGoogleButton />
            <SigninGithubButton />
            <SigninTwitterButton />
            <SigninLineButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
