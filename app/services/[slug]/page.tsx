// app/shop/[slug]/page.tsx
import { cosmic } from "@/lib/cosmic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/image-gallery";
export default async function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { object: product } = await cosmic.objects
    .findOne({
      type: "products",
      slug: params.slug,
    })
    .props("id,slug,title,metadata")
    .depth(1);
  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <div className="relative m-auto max-w-[950px]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol role="list" className="flex space-x-2">
              <li>
                <div className="flex items-center">
                  <Link
                    href="/services"
                    className="mr-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Services
                  </Link>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 md:gap-x-8">
            <div>
              <ImageGallery items={product.metadata.gallery} />
            </div>
            <div>
              <h1 className="mt-6 mb-2 md:mt-0 md:mb-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl text-zinc-900 dark:text-zinc-50">
                {product.title}
              </h1>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white mb-6">
                ${product.metadata.price.toLocaleString("en-US")}
              </p>
              <div className="mb-8">
                <Button type="submit">Add to cart</Button>
              </div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Details
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.metadata.description,
                }}
                className="mb-6 text-sm text-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
