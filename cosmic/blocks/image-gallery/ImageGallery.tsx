import { ImageGalleryClient } from "./ImageGalleryClient";
import { cosmic } from "@/cosmic/client";

export async function ImageGallery({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1)
    .status(status ? status : "published");
  if (!page.metadata.gallery?.length) return <></>;
  return (
    <ImageGalleryClient items={page.metadata.gallery} className={className} />
  );
}
