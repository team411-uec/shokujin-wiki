import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SigninTwitterButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitter");
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Image
          alt=""
          src="/twitter-original.svg"
          width={128}
          height={128}
          className="h-full w-auto"
        />
        Xでログイン
      </Button>
    </form>
  );
}
