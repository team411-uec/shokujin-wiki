"use server";

import { auth } from "@/auth";
import { s3client } from "@/s3client";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { randomUUID } from "crypto";

export async function uploadImage(file: File) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const filename = `${randomUUID().replace(/-/g, "")}.${file.name.split(".").pop()}`;

  const presignedPost = await createPresignedPost(s3client, {
    Bucket: "shokujin-wiki-resources-183295441800",
    Key: filename,
    Conditions: [["content-length-range", 0, 1024 * 1024 * 10]], // max 10MB
    Expires: 60 * 60, // 1 hour
    Fields: {
      "Content-Type": file.type,
    },
  });

  return presignedPost;
}
