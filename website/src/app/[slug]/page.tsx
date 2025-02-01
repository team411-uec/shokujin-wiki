import { Viewer } from "@/components/Viewer";
import { prisma } from "@/prisma";
import Link from "next/link";

interface WikiPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: {
      slug: decodeURIComponent(slug),
    },
  });

  if (!article) {
    return (
      <Viewer>
        <h1>Article not found</h1>
        <p>
          The article you are looking for does not exist. Please check the URL
          and try again.
        </p>
        <p>
          <Link href={`/_create?slug=${slug}`}>
            「{decodeURIComponent(slug)}
            」を作成するにはここをクリックしてください
          </Link>
        </p>
      </Viewer>
    );
  }

  return (
    <Viewer>
      <h1>{decodeURIComponent(slug)}</h1>
    </Viewer>
  );
}
