import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

import { signOut } from "@/features/auth/actions";
import { createClient } from "@/utils/supabase/server";

export async function AppHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box component={NextLink} href="/" sx={{ flexGrow: 1 }}>
          <Image
            alt=""
            src="/logo.svg"
            width={349}
            height={45}
            style={{ height: 24, width: "auto", display: "block" }}
            priority
          />
        </Box>
        {user ? (
          <form action={signOut}>
            <Button variant="text" color="inherit" type="submit">
              ログアウト
            </Button>
          </form>
        ) : (
          <>
            <Button
              variant="text"
              color="inherit"
              component={NextLink}
              href="/signin"
            >
              ログイン
            </Button>
            <Button
              variant="text"
              color="inherit"
              component={NextLink}
              href="/signup"
            >
              新規登録
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
