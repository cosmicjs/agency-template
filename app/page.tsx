// app/page.tsx
import { FAQs } from "@/cosmic/blocks/faqs/FAQs"
import { Testimonials } from "@/cosmic/blocks/testimonials/Testimonials"
import { Page } from "@/cosmic/blocks/pages/Page"

export default async function HomePage() {
  return (
    <main>
      <Page query={{ slug: "home", type: "pages" }} />
      <section className="md:container mt-12 pb-8 m-auto px-4">
        <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h3 className="m-auto mb-4 text-2xl md:text-4xl font-display text-zinc-900 dark:text-zinc-100 tracking-tighter">
            Hear from our customers
          </h3>
          <Testimonials query={{ type: "testimonials" }} />
        </div>
      </section>

      <section className="md:container mt-12 pb-8 m-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <FAQs query={{ slug: "home", type: "pages" }} />
        </div>
      </section>
    </main>
  )
}
