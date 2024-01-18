import { cn, getFormattedDate } from "@/cosmic/utils"
import { Calendar, Clock, Pin } from "lucide-react"
import Link from "next/link"

export type EventCardType = {
  title: string
  slug: string
  metadata: {
    description: string
    location: string
    start_date: string
    start_time: string
    end_date: string
    end_time: string
    image: {
      imgix_url: string
    }
  }
}

export function EventCard({
  event,
  className,
}: {
  event: EventCardType
  className?: string
}) {
  return (
    <Link
      className={cn("group relative w-full mb-auto", className)}
      href={`/events/${event.slug}`}
    >
      <div className="w-full overflow-hidden group-hover:opacity-75">
        <img
          className="h-full w-full rounded-xl object-cover object-center aspect-square lg:h-full lg:w-full border border-zinc-100 dark:border-zinc-800"
          src={`${event.metadata.image.imgix_url}?w=1000&h=1000&auto=format,compression`}
          alt={event.title}
        />
      </div>
      <div className="mt-4">
        <div className="text-lg font-medium leading-tight text-zinc-700 dark:text-zinc-300">
          {event.title}
        </div>
        <div className="h-full space-y-4 flex flex-col font-medium">
          <div
            className="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: event.metadata.description }}
          />
          <div className="flex flex-col h-full justify-end space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Calendar className="shrink-0 w-4 h-4" />
              <span>{getFormattedDate(event.metadata.start_date)}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Clock className="shrink-0 mr-1 w-4 h-4" />
              <span>From</span>
              <span>{event.metadata.start_time}</span>
              <span>until</span>
              {event.metadata.start_date !== event.metadata.end_date && (
                <span>{getFormattedDate(event.metadata.end_date)}</span>
              )}
              <span>{event.metadata.end_time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Pin className="shrink-0 w-4 h-4" />
              <span>{event.metadata.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
