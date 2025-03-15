"use server";

import type { AuthError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type ReturnType =
  | {
      status: "error";
      message?: string;
      fieldErrors?: z.inferFlattenedErrors<
        typeof inputSchema,
        string
      >["fieldErrors"];
    }
  | { status: "ready" };

export async function signIn(
  _prevState: unknown,
  formData: FormData,
): Promise<ReturnType> {
  const supabase = await createClient();

  const result = inputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) return generateParseError(result.error);

  const { error } = await supabase.auth.signInWithPassword(result.data);
  if (error) return generateAuthError(error);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(
  _prevState: unknown,
  formData: FormData,
): Promise<ReturnType> {
  const supabase = await createClient();

  const result = inputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) return generateParseError(result.error);

  const { error } = await supabase.auth.signUp(result.data);
  if (error) return generateAuthError(error);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

function generateParseError(error: z.ZodError<z.infer<typeof inputSchema>>): {
  status: "error";
  fieldErrors: z.inferFlattenedErrors<
    typeof inputSchema,
    string
  >["fieldErrors"];
} {
  return {
    status: "error",
    fieldErrors: error.flatten(({ message }) => message).fieldErrors,
  };
}

function generateAuthError(error: AuthError): {
  status: "error";
  message: string;
} {
  let message = error.message;
  if (error.code === "invalid_credentials") {
    message = "メールアドレスまたはパスワードが間違っています";
  } else if (error.code === "user_already_exists") {
    message = "このメールアドレスは既に登録されています";
  }
  return { status: "error", message };
}
