// components/header.tsx
import Link from "next/link";
import { cosmic } from "@/cosmic/client";
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";

export default async function Header() {
  // Header data
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1);

  return (
    <div className="space-x-4 fixed top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg py-2 w-full z-[9999]">
      <div className="flex w-full items-center md:container justify-between pl-2 pr-4">
        <Link href="/">
          <img
            src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-10 m-auto dark:hidden"
          />
          <img
            src={`${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-10 m-auto hidden dark:block"
          />
        </Link>
        <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
      </div>
    </div>
  );
}
