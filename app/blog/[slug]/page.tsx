// app/blog/[slug]/page.tsx
import { cosmic } from "@/lib/cosmic";
import Markdown from "react-markdown";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Comments } from "@/components/comments";

export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
      slug: params.slug,
    })
    .props("id,slug,title,metadata")
    .depth(1);

  const date = new Date(blog.metadata.published_date).toLocaleDateString(
    "en-us",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <>
      <div className="mb-10 w-full max-h-[500px] overflow-hidden">
        <img
          src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
          alt={blog.title}
          className="object-cover w-full"
        />
      </div>
      <section className="container grid items-center pb-8 m-auto">
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl text-black dark:text-white">
            {blog.title}
          </h1>
          <div className="flex mb-8">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {blog.metadata.author.title}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">{date}</span>
            </div>
            <div className="absolute right-0">
              {blog.metadata.categories.map((category: any) => {
                const categoryBackgroundColor = `${category.metadata.color}22`;
                return (
                  <span
                    className="mb-1 mr-1 rounded-xl px-3 py-1 text-black/70 dark:text-white/70"
                    style={{
                      backgroundColor: categoryBackgroundColor,
                      border: `1px solid ${category.metadata.color}`,
                    }}
                    key={category.slug}
                  >
                    {category.title}
                  </span>
                );
              })}
            </div>
          </div>
          <Markdown className="text-zinc-700 dark:text-zinc-300 space-y-4">
            {blog.metadata.content}
          </Markdown>
          <Comments resourceId={blog.id} />
          <div className="my-10">
            <Link href="/blog" className="flex text-blue-800">
              <ArrowLeftIcon className="w-4 h-4 mr-2 mt-1" /> Back to blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
