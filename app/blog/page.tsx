// app/blog/page.tsx
import BlogList from "@/components/blog-list";
import { cosmic } from "@/lib/cosmic";

export default async function BlogPage() {
  const { objects: posts } = await cosmic.objects
    .find({
      type: "blog-posts",
    })
    .props("id,slug,title,metadata")
    .sort("metadata.published_date")
    .depth(1);

  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <BlogList posts={posts.reverse()} />
      </section>
    </main>
  );
}
