import { cosmic } from "@/cosmic/client"
import { ProductCard, ProductType } from "./ProductCard"

export async function ProductList({
  query,
  className,
}: {
  query: any
  className?: string
}) {
  const { objects: products } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
  return (
    <div className={className}>
      {products.map((product: ProductType) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}
