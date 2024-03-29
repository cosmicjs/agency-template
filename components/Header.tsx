// components/header.tsx
import Link from "next/link"
import { cosmic } from "@/cosmic/client"
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu"
import Banner from "@/components/Banner"

export default async function Header() {
  // Header data
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1)

  return (
    <nav className="space-x-4 sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg w-full z-[9999]">
      <Banner />
      <div className="flex w-full items-center md:container justify-between p-4">
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
        <NavMenu
          query={{ type: "navigation-menus", slug: "header" }}
          hasMobileMenu
        />
      </div>
    </nav>
  )
}
