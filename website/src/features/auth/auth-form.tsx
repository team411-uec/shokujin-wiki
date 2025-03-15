import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";

interface AuthFormProps {
  type: "signin" | "signup";
  errors: {
    [K in "email" | "password"]?: string[];
  };
  disabled?: boolean;
}

export function AuthForm({ type, errors, disabled = false }: AuthFormProps) {
  return (
    <>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            disabled={disabled}
            error={!!errors.email?.length}
            helperText={errors.email?.join("\n") || ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            autoComplete={
              type === "signin" ? "current-password" : "new-password"
            }
            required
            fullWidth
            disabled={disabled}
            error={!!errors.password?.length}
            helperText={errors.password?.join("\n") || ""}
          />
        </FormControl>
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        mt={2}
        sx={{ justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          {type === "signin" ? "ログイン" : "新規登録"}
        </Button>
      </Stack>
    </>
  );
}
