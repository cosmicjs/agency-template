// components/image-gallery.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type GalleryItemType = {
  image: {
    imgix_url: string;
  };
  description: string;
};

export function ImageGallery({ items }: { items: GalleryItemType[] }) {
  const [mainItem, setMainItem] = useState(items[0]);

  return (
    <>
      <div>
        <img
          src={`${mainItem.image.imgix_url}?w=1200&auto=format,compression`}
          alt={mainItem.description}
          className="rounded-xl mb-4 h-80 w-full object-cover object-center"
        />
      </div>
      <div className="flex gap-x-2">
        {items.map((item: any) => {
          return (
            <div
              title={item.description}
              onClick={() => setMainItem(item)}
              key={item.image.imgix_url}
              className={cn(
                `rounded-xl overflow-hidden border-2`,
                item.image.imgix_url === mainItem.image.imgix_url
                  ? "border-gray-600"
                  : "",
              )}
            >
              <img
                src={`${item.image.imgix_url}?w=200&auto=format,compression`}
                className="h-20 w-20 object-cover object-center cursor-pointer"
                alt={item.description}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
