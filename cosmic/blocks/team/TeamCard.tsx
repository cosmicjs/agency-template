// components/team-card.tsx
import { cn } from "@/cosmic/utils"

export type MemberType = {
  title: string
  slug: string
  metadata: {
    image: {
      imgix_url: string
    }
    position: string
    bio: string
    links: {
      x: string
      linkedin: string
    }
  }
}
export function TeamCard({
  member,
  className,
}: {
  member: MemberType
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border  border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 md:flex-row",
        className
      )}
    >
      <div className="md:w-2/5">
        <img
          className="h-full w-full object-cover object-center"
          src={`${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}`}
          alt={member.title}
        />
      </div>
      <div className="w-full space-y-2 p-4 text-left md:w-3/5">
        <p className="text-xl font-bold text-zinc-700 dark:text-zinc-100">
          {member.title}
        </p>
        <p className="font-normal text-zinc-700 dark:text-zinc-100">
          {member.metadata.position}
        </p>
        <p className="text-sm font-normal leading-relaxed text-zinc-700 dark:text-gray-300">
          {member.metadata.bio}
        </p>
        <div className="flex justify-start space-x-4 py-4">
          {member.metadata.links.x && (
            <a
              href={member.metadata.links.x}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg
                color="currentColor"
                aria-label="X"
                fill="currentColor"
                height="22"
                viewBox="0 0 22 20"
              >
                <path
                  d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 
                    0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          )}
          {member.metadata.links.linkedin && (
            <a
              href={member.metadata.links.linkedin}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
