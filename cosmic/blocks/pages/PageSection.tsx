// components/page-section.tsx
import { cn } from "@/cosmic/utils"
import { buttonVariants } from "@/cosmic/elements/Button"
import Link from "next/link"

type SectionType = {
  heading: string
  layout: {
    key: string
    value: string
  }
  image: {
    url: string
    imgix_url: string
  }
  content: string
  cta_link: string
  cta_text: string
}

export function Section({
  section,
  className,
}: {
  section: SectionType
  className?: string
}) {
  return (
    <div key={section.heading} className={className}>
      {section.layout.key === "1-column-center" && (
        <div className="m-auto max-w-[800px]">
          <div className="mb-6 text-center">
            <h3 className="mb-4 text-2xl font-semibold">{section.heading}</h3>
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            <div>
              <a
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
                href={section.cta_link}
              >
                {section.cta_text}
              </a>
            </div>
          </div>
          <div>
            <img
              alt={section.heading}
              className="rounded-xl"
              src={`${section.image.imgix_url}?w=1200&auto=format,compression`}
            />
          </div>
        </div>
      )}
      {section.layout.key === "2-column-image-content" && (
        <div className="grid gap-2 md:grid-cols-2">
          <div className="mr-4">
            <img
              alt={section.heading}
              className="rounded-xl"
              src={`${section.image.imgix_url}?w=1200&auto=format,compression`}
            />
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-semibold">{section.heading}</h3>
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            <div>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
                href={section.cta_link}
              >
                {section.cta_text}
              </Link>
            </div>
          </div>
        </div>
      )}
      {section.layout.key === "2-column-content-image" && (
        <div className="grid gap-2 md:grid-cols-2">
          <div className="mr-4">
            <h3 className="mb-4 text-2xl font-semibold">{section.heading}</h3>
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            <div>
              <a
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
                href={section.cta_link}
              >
                {section.cta_text}
              </a>
            </div>
          </div>
          <div>
            <img
              alt={section.heading}
              className="rounded-xl"
              src={`${section.image.imgix_url}?w=1200&auto=format,compression`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
