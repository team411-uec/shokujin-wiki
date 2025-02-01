import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SigninGoogleButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Image
          alt=""
          src="/google-original.svg"
          width={128}
          height={128}
          className="h-full w-auto"
        />
        Googleでログイン
      </Button>
    </form>
  );
}
