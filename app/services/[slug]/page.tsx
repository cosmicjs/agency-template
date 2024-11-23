// app/shop/[slug]/page.tsx
import { SingleProduct } from "@/cosmic/blocks/ecommerce/SingleProduct";
import { cosmic } from "@/cosmic/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const { objects: products } = await cosmic.objects.find({
    type: "products",
  });
  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}
export default async function SingleProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    success?: string;
  };
}) {
  return (
    <main className="p-4">
      <SingleProduct
        query={{ slug: params.slug, type: "products" }}
        purchased={searchParams.success ? true : false}
      />
    </main>
  );
}
