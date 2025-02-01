import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CreatePageProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

export default async function CreatePage({ searchParams }: CreatePageProps) {
  const { slug } = await searchParams;

  return (
    <div>
      <h1 className="text-4xl font-bold">
        「{decodeURIComponent(slug)}」の作成
      </h1>
      <form className="mt-4 space-y-4">
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
