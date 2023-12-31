import { BlogCard, PostType } from "./BlogCard"
import { cosmic } from "@/cosmic/client"

export async function BlogList({
  query,
  sort,
  limit,
  skip,
  className,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
}) {
  const { objects: posts } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return (
    <div className={className}>
      {posts.map((post: PostType) => {
        return <BlogCard key={post.id} post={post} />
      })}
    </div>
  )
}