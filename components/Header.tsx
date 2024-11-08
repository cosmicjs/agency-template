// components/header.tsx
import Link from "next/link";
import { cosmic } from "@/cosmic/client";
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
import { CheckOut } from "@/cosmic/blocks/ecommerce/CheckOut";

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
    <nav className="sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg w-full z-[9999]">
      <div className="flex w-full items-center md:container justify-between p-4 flex-wrap gap-4">
        <Link href="/" className="flex-shrink-0">
          <img
            src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-10 w-auto dark:hidden"
          />
          <img
            src={`${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-10 w-auto hidden dark:block"
          />
        </Link>
        <div className="flex items-center flex-wrap">
          <NavMenu
            query={{ type: "navigation-menus", slug: "header" }}
            hasMobileMenu
            className="flex flex-wrap"
          />
          <CheckOut className="ml-4" productPath={"/services"} />
        </div>
      </div>
    </nav>
  );
}
