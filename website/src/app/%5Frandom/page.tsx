import { prisma } from "@/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ランダムページ",
  alternates: {
    canonical: "https://shokujin.com/_random",
  },
};

export default async function RandomPage() {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });
  // ランダムな記事を取得
  const randomArticle = articles[Math.floor(Math.random() * articles.length)];
  redirect(`/${randomArticle.slug}`);
}
