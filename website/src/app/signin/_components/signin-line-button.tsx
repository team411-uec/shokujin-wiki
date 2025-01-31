import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SigninLineButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("line");
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Image
          alt=""
          src="/line_brand-icon.png"
          width={100}
          height={100}
          className="h-full w-auto"
        />
        LINEでログイン
      </Button>
    </form>
  );
}
