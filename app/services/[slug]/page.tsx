// app/shop/[slug]/page.tsx
import { SingleProduct } from "@/cosmic/blocks/products/SingleProduct"
export default async function SingleProductPage({
  params,
  searchParams
}: {
    params: { slug: string }
    searchParams: {
      success: string
    }
  }) {
  console.log(searchParams)
  return (
    <main className="p-4">
      <SingleProduct query={{ slug: params.slug, type: "products" }} purchased={searchParams.success} />
    </main>
  )
}
