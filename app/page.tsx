// app/page.tsx
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/page-section";
import { Testimonials } from "@/components/testimonials";
import { FAQs } from "@/components/faqs";
import { cosmic } from "@/lib/cosmic";

export default async function HomePage() {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "home",
    })
    .props("slug,title,metadata")
    .depth(1);

  return (
    <main className="p-4">
      <div className="w-full flex flex-col-reverse md:flex-row justify-between md:gap-12 max-w-6xl mx-auto pb-16 text-zinc-950 dark:text-zinc-50">
        <div className="flex flex-col items-start justify-start w-full md:w-1/2">
          <div className="pt-4 md:pt-20 pb-4">
            <h1 className="text-4xl md:text-8xl font-display tracking-tight">
              {page.metadata.h1}
            </h1>
          </div>
          <div className="pb-8 m-auto">
            <div className="text-xl text-zinc-700 dark:text-zinc-300">
              {page.metadata.subheadline}
            </div>
          </div>
          <div className="md:pb-20 w-full">
            <div className="flex gap-4 w-full md:w-max">
              <a
                className={cn(
                  "w-full md:w-max",
                  buttonVariants({
                    variant: "default",
                  })
                )}
                href="https://www.cosmicjs.com"
              >
                Get started free
              </a>
              <a
                className={cn(
                  "w-full md:w-max",
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
                href="https://www.cosmicjs.com/contact"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 my-auto">
          <img
            src={`${page.metadata.image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="w-full dark:hidden"
          />
          <img
            src={`${page.metadata.dark_image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="w-full hidden dark:block"
          />
        </div>
      </div>
      <section className="grid items-center py-10 bg-zinc-50 dark:bg-zinc-900">
        <div className="relative m-auto max-w-6xl flex flex-col items-start gap-2">
          <h2 className="m-auto max-w-[800px] text-center text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 pt-8">
            {page.metadata.section_title}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px] text-center text-zinc-700 dark:text-zinc-300"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section key={section.heading} section={section} />;
            })}
          </div>
        </div>
      </section>

      <section className="md:container mt-12 pb-8 m-auto">
        <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h3 className="m-auto mb-4 text-2xl md:text-4xl font-display text-zinc-900 dark:text-zinc-100 tracking-tighter">
            Hear from our customers
          </h3>
          <Testimonials />
        </div>
      </section>

      <section className="md:container mt-12 pb-8 m-auto">
        <div className="max-w-4xl mx-auto">
          {page.metadata.faqs && <FAQs faqs={page.metadata.faqs} />}
        </div>
      </section>
    </main>
  );
}
