import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function RandomPage() {
  const articles = await prisma.article.findMany();
  // ランダムな記事を取得
  const randomArticle = articles[Math.floor(Math.random() * articles.length)];
  redirect(`/${randomArticle.slug}`);
}
