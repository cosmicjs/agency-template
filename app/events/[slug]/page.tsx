import { SingleEvent } from "@/cosmic/blocks/events/SingleEvent";
import { cosmic } from "@/cosmic/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const { objects: events } = await cosmic.objects.find({
    type: "events",
  });
  return events.map((event: { slug: string }) => ({
    slug: event.slug,
  }));
}

export default async function SingleEventPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="p-4">
      <SingleEvent query={{ slug: params.slug, type: "events" }} />
    </main>
  );
}
