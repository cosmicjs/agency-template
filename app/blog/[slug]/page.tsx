// app/blog/[slug]/page.tsx
import { SingleBlog } from "@/cosmic/blocks/blog/SingleBlog";

export default async function BlogPost({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="p-4">
      <SingleBlog query={{ slug: params.slug, type: "blog-posts" }} />
    </main>
  );
}
