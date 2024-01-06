// app/blog/[slug]/page.tsx
import { cosmic } from "@/cosmic/client"
import Markdown from "react-markdown"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Comments } from "@/cosmic/blocks/comments/Comments"

export async function SingleBlog({
  query,
  className,
}: {
  query: any
  className?: string
}) {
  const { object: blog } = await cosmic.objects
    .findOne(query)
    .props("id,slug,title,metadata")
    .depth(1)

  const date = new Date(blog.metadata.published_date).toLocaleDateString(
    "en-us",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )
  return (
    <div className={className}>
      <section className="m-auto grid items-center pb-8 md:container">
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <div className="lg:absolute lg:-left-[170px] lg:top-2">
            <Link href="/blog" className="flex text-sky-500 dark:text-sky-400">
              <ArrowLeftIcon className="mr-2 mt-1 h-4 w-4" /> Back to blog
            </Link>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
            {blog.title}
          </h1>
          <div className="mb-10 w-full overflow-hidden rounded-xl">
            <img
              src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
              alt={blog.title}
              className="w-full object-cover aspect-video"
            />
          </div>
          <div className="mb-8 md:flex">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div className="mb-4 flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {blog.metadata.author.title}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">{date}</span>
            </div>
            <div className="md:absolute md:right-0">
              {blog.metadata.categories.map((category: any) => {
                const categoryBackgroundColor = `${category.metadata.color}22`
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
                )
              })}
            </div>
          </div>
          <Markdown className="space-y-4 text-zinc-700 dark:text-zinc-300">
            {blog.metadata.content}
          </Markdown>
          <Comments
            query={{
              type: "comments",
              "metadata.resource": blog.id,
              "metadata.approved": true,
            }}
          />
          <div className="my-10">
            <Link href="/blog" className="flex text-sky-500 dark:text-sky-400">
              <ArrowLeftIcon className="mr-2 mt-1 h-4 w-4" /> Back to blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
