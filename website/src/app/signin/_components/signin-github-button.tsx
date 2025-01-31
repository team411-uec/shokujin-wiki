import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SigninGithubButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Image
          alt=""
          src="/github-original.svg"
          width={128}
          height={128}
          className="h-full w-auto"
        />
        GitHubでログイン
      </Button>
    </form>
  );
}
