// app/shop/[slug]/page.tsx
import { cosmic } from "@/cosmic/client";
import Link from "next/link";
import { ImageGallery } from "@/cosmic/blocks/image-gallery/ImageGallery";
import { cn } from "@/cosmic/utils";
import { notFound } from "next/navigation";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/cosmic/elements/Button";
import { AddToCart } from "@/cosmic/blocks/products/AddToCart";

export async function SingleProduct({
  query,
  className,
  status,
  purchased,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
  purchased?: boolean;
}) {
  try {
    const { object: product } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .status(status ? status : "published");

    return (
      <section className={cn("md:container m-auto pb-8", className)}>
        <div className="relative m-auto max-w-[950px]">
          {purchased && (
            <div className="flex border-green-700 text-green-700 border p-4 rounded-lg mb-6">
              <CheckCircleIcon className="mr-4 size-4 mt-1" />
              <div>
                Purchase complete. Thank you for your order, we will be in touch
                with your order details!
              </div>
            </div>
          )}
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
            <div className="mb-4">
              <ImageGallery query={query} />
            </div>
            <div>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {product.title}
              </h1>
              <p className="mb-6 text-3xl tracking-tight text-gray-900 dark:text-white">
                ${product.metadata.price.toLocaleString("en-US")}
                {product.metadata.recurring.is_recurring && (
                  <span> / {product.metadata.recurring.interval.value}</span>
                )}
              </p>
              <div className="mb-8">
                {!product.metadata.quantity ? (
                  <Button
                    variant="outline"
                    disabled
                    className="border-gray-500 text-gray-900 dark:text-gray-100"
                  >
                    Sold out
                  </Button>
                ) : (
                  <>
                    {product.metadata.stripe_product_id ? (
                      <>
                        <AddToCart product={product} />
                      </>
                    ) : (
                      <div className="flex border-red-500 dark:text-white text-gray-700 border p-4 rounded-lg">
                        <XCircleIcon className="text-red-500 mr-4" />
                        Product not available for purchase
                      </div>
                    )}
                  </>
                )}
              </div>
              <h2 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
