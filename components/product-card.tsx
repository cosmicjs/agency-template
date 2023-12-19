// components/product-card.tsx
import Link from 'next/link';

export type ProductType = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    image: {
      imgix_url: string;
    };
    description: string;
    price: number;
  };
};

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/services/${product.slug}`} className='group relative w-full md:w-56'>
      <div className='w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-52'>
        <img src={`${product.metadata.image.imgix_url}?w=1200&auto=format,compression`} alt={product.title} className='h-full w-full object-cover object-center lg:h-full lg:w-full border border-zinc-100 dark:border-zinc-800' />
      </div>
      <div className='mt-2 flex justify-between'>
        <div>
          <h3 className='text-sm text-zinc-700 dark:text-zinc-300'>
            <span aria-hidden='true' className='absolute inset-0'></span>
            {product.title}
          </h3>
        </div>
        <p className='text-sm font-medium text-zinc-900 dark:text-zinc-50'>${product.metadata.price.toLocaleString('en-US')}</p>
      </div>
    </Link>
  );
}
