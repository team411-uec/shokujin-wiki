import { Button, Stack } from "@mui/material";
import GoogleOriginalIcon from "react-devicons/google/original";

import { signInWithGoogle } from "./social-login-actions";

export function SocialLogin() {
  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        color="info"
        fullWidth
        startIcon={<GoogleOriginalIcon />}
        onClick={() => void signInWithGoogle()}
      >
        Googleで続ける
      </Button>
    </Stack>
  );
}
