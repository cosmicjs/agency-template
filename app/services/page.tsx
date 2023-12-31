// app/page.tsx
import { cosmic } from "@/lib/cosmic";
import { ProductList } from "@/cosmic/blocks/products/ProductList";

export default async function ShopPage() {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "services",
    })
    .props("slug,title,metadata")
    .depth(1);

  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <div className="m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            {page.metadata.h1}
          </h1>
          <h2 className="text-lg md:text-2xl text-zinc-900 dark:text-zinc-100 tracking-tighter justify-center flex">
            {page.metadata.subheadline}
          </h2>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: page.metadata.content }}
              className="text-xl text-zinc-700 dark:text-zinc-300"
            />
          </div>
          <ProductList
            className="mt-6 w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
            query={{ type: "products" }}
          />
        </div>
      </section>
    </main>
  );
}
