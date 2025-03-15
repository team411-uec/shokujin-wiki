import { Link } from "@mui/material";
import NextLink from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div>
      <p>ログインに失敗しました</p>
      <Link component={NextLink} href="/signin">
        ログインページに戻る
      </Link>
    </div>
  );
}
