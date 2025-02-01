import { AppHeader } from "@/components/app-header";
import { Viewer } from "@/components/viewer";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <>
      <AppHeader />
      <Viewer>
        <h1>Unauthorized</h1>
        <p>
          <Link href="/_signin">続けるにはここからログインしてください</Link>
        </p>
      </Viewer>
    </>
  );
}
