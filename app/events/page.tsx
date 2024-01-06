// app/events/page.tsx
import { EventsList } from "@/cosmic/blocks/events/EventsList"

export default async function EventListPage() {
  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <div className="m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Upcoming Events
          </h1>
          <EventsList
            className="m-auto grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
            query={{ type: "events" }}
          />
        </div>
      </section>
    </main>
  )
}
