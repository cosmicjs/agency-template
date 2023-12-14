// app/blog/page.tsx
import { cosmic } from '@/lib/cosmic';
import { BlogCard, PostType } from '@/components/blog-card';

export default async function BlogPage() {
  const { objects: posts } = await cosmic.objects
    .find({
      type: 'blog-posts',
    })
    .props('id,slug,title,metadata')
    .depth(1);

  return (
    <>
      <section className='container pb-8 m-auto'>
        <div className='relative m-auto flex max-w-[950px] flex-col items-start gap-2'>
          <h1 className='mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>Blog</h1>
          <div className='mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10'>
            {posts.map((post: PostType) => {
              return <BlogCard key={post.id} post={post} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
