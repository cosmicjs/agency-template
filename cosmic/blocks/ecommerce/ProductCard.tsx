// components/product-card.tsx
import Link from "next/link";
import { cn } from "@/cosmic/utils";

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

export function ProductCard({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${product.slug}`}
      className={cn("group relative", className)}
    >
      <div className="h-52 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <img
          src={`${product.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          alt={product.title}
          className="h-full w-full border border-zinc-100 object-cover object-center dark:border-zinc-800 lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-sm text-zinc-700 dark:text-zinc-300">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.title}
          </h3>
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          ${product.metadata.price.toLocaleString("en-US")}
        </p>
      </div>
    </Link>
  );
}
