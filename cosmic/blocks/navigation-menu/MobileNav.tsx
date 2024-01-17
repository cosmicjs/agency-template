"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/cosmic/utils"

import { MenuIcon, XIcon } from "lucide-react"
import { ItemType } from "./NavMenu"

export function MobileNav({
  items,
  className,
}: {
  items: ItemType[]
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className={cn("relative md:hidden", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-6 w-6 cursor-pointer"
      >
        {isOpen ? (
          <XIcon className="text-black dark:text-white" />
        ) : (
          <MenuIcon className="text-black dark:text-white" />
        )}
      </button>
      {isOpen && (
        <div className="absolute -right-3 top-full z-[9999] mt-2 w-[90svw] rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800">
          <div>
            {items.map((item: ItemType) => {
              return (
                <Link
                  href={item.link}
                  key={item.title}
                  onClick={() => setIsOpen(!isOpen)}
                  target={item.open_in_new_tab ? "_blank" : ""}
                  className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
