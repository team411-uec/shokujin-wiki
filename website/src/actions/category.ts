"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function createCategory(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { name } = Object.fromEntries(formData);

  const created = await prisma.category.create({
    data: {
      name: name as string,
    },
  });

  return created;
}
