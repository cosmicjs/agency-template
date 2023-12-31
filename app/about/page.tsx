// app/page.tsx
import { cosmic } from "@/lib/cosmic";
import { TeamList } from "@/cosmic/blocks/team/TeamList";

export default async function AboutPage() {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "about",
    })
    .props("slug,title,metadata")
    .depth(1);
  return (
    <main className="py-4">
      <section className="pb-8 m-auto px-4">
        <div className="m-auto max-w-[950px] flex flex-col items-start gap-2">
          <div className="md:container">
            <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
              {page.metadata.h1}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: page.metadata.content }}
              className="text-zinc-700 dark:text-zinc-300"
            />
          </div>
        </div>
      </section>
      <div className="mt-4 md:mt-8 w-full bg-zinc-50 dark:bg-zinc-900 px-4">
        <section className="py-8 w-full md:max-w-7xl mx-auto">
          <h2 className="w-full mb-4 text-2xl md:text-4xl font-display text-zinc-900 dark:text-zinc-100 tracking-tighter justify-center flex">
            Our team
          </h2>
          <TeamList
            query={{ type: "team-members" }}
            className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
          />
        </section>
      </div>
    </main>
  );
}
