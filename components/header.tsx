// components/header.tsx
import Link from "next/link";
import { cosmic } from "@/lib/cosmic";
import { NavMenu } from "@/components/nav-menu";

export default async function Header() {
  // Header data
  const { object: header } = await cosmic.objects
    .findOne({
      type: "navigation-menus",
      slug: "header",
    })
    .props("metadata")
    .depth(1);

  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1);

  return (
    <div className="my-4 space-x-4 sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg py-2 w-full z-[9999]">
      <div className="flex w-full items-center justify-between container">
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
        <NavMenu items={header.metadata.items} />
      </div>
    </div>
  );
}
