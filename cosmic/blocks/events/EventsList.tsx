import { cosmic } from "@/cosmic/client";
import { EventCard, EventCardType } from "./EventCard";

export async function EventsList({
  query,
  className,
  preview,
}: {
  query: any;
  className?: string;
  preview?: boolean;
}) {
  const { objects: events } = await cosmic.objects
    .find(query)
    .props("title,slug,metadata")
    .depth(1)
    .status(preview ? "any" : "published");

  return (
    <div className={className}>
      {events?.map((event: EventCardType) => {
        return <EventCard event={event} key={event.slug} />;
      })}
    </div>
  );
}
