// components/testimonials.tsx
import { cosmic } from '@/lib/cosmic';

export async function Testimonials() {
  const { objects: testimonials } = await cosmic.objects
    .find({
      type: 'testimonials',
    })
    .props('title,slug,metadata')
    .depth(1);

  type Testimonial = {
    title: string;
    slug: string;
    metadata: {
      company: string;
      position: string;
      quote: string;
      image: {
        imgix_url: string;
      };
    };
  };

  function Testimonial({ testimonial }: { testimonial: Testimonial }) {
    return (
      <figure className='mb-6 flex flex-col md:flex-row bg-zinc-100 overflow-hidden rounded-xl p-8 md:p-0 dark:bg-zinc-800 gap-4'>
        <img className='w-24 h-24 object-cover md:w-48 md:h-auto md:rounded-none rounded-full mx-auto' src={`${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`} alt={testimonial.title} />
        <div className='md:p-8 text-center md:text-left space-y-4'>
          <blockquote className='relative'>
            <p className='relative text-lg z-10 text-zinc-600 dark:text-zinc-300'>&quot;{testimonial.metadata.quote}&quot;</p>
          </blockquote>
          <figcaption className='font-medium'>
            <div className='text-sky-500 dark:text-sky-400'>{testimonial.title}</div>
            <div className='text-zinc-500 dark:text-zinc-400'>
              {testimonial.metadata.position}, {testimonial.metadata.company}
            </div>
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <>
      {testimonials.map((testimonial: Testimonial) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />;
      })}
    </>
  );
}
