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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
