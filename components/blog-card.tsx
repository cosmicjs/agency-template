// components/blog-card.tsx
import Link from "next/link";

export type PostType = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    image: {
      imgix_url: string;
    };
    categories: {
      title: string;
      metadata: {
        color: string;
      };
    }[];
    content: string;
    author: {
      title: string;
      metadata: {
        image: {
          imgix_url: string;
        };
      };
    };
    published_date: string;
  };
};

export function BlogCard({ post }: { post: PostType }) {
  return (
    <article>
      <Link
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl shadow-gray-500/20 
        transition hover:bg-white bg-zinc-50 dark:bg-zinc-900 dark:shadow-none dark:hover:bg-zinc-800 linear duration-300"
        href={`/blog/${post.slug}`}
      >
        <div className="relative h-full">
          <img
            alt={post.title}
            className="object-cover h-80 w-full"
            src={`${post.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          />
        </div>
        <div
          className="flex h-full flex-col justify-between rounded-b-lg border-x border-b 
        border-transparent px-5 py-8 dark:border-gray-900 md:px-8"
        >
          <div className="relative z-10">
            {post.metadata.categories.map((category: any) => {
              return (
                <span
                  className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mr-2"
                  key={category.slug}
                >
                  {category.title}
                </span>
              );
            })}
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-white">
              {post.title}
            </h2>
            <p className="line-clamp-3 w-full pt-3 text-gray-600 dark:text-gray-400">
              {post.metadata.content.slice(0, 200)}...
            </p>
          </div>
          <div
            className="relative z-10 flex w-full flex-col items-start justify-between 
          space-y-10 pt-8 md:flex-row md:items-center md:space-y-0"
          >
            <div className="flex w-full items-center gap-10 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center overflow-hidden 
                rounded-full bg-gray-200 dark:bg-gray-800"
                >
                  <img
                    alt={post.metadata.author.title}
                    src={`${post.metadata.author.metadata.image.imgix_url}?w=400&auto=format,compression`}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div>
                  <div>
                    <span className="font-semibold">
                      {post.metadata.author.title}
                    </span>
                    <br />
                    {new Date(post.metadata.published_date).toLocaleDateString(
                      "en-us",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
