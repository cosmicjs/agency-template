// app/blog/page.tsx
import { cosmic } from "@/lib/cosmic";
import { BlogCard, PostType } from "@/components/blog-card";

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
        <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Blog
          </h1>
          <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
            {posts.reverse().map((post: PostType) => {
              return <BlogCard key={post.id} post={post} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
