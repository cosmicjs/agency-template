import { ImageGalleryClient } from "./ImageGalleryClient"
import { cosmic } from "@/cosmic/client"

export async function ImageGallery({
  query,
  className,
}: {
  query: any
  className?: string
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1)
  if (!page.metadata.gallery?.length) return <></>
  return (
    <ImageGalleryClient items={page.metadata.gallery} className={className} />
  )
}
