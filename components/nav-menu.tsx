// components/nav-menu.tsx
"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MenuIcon, XIcon } from "lucide-react";

export type Item = { title: string; link: string; open_in_new_tab: boolean };

export function NavMenu({ items }: { items: Item[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {items.map((item: Item) => {
                return (
                  <Link
                    href={item.link}
                    legacyBehavior
                    passHref
                    key={item.title}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      target={item.open_in_new_tab ? "_blank" : ""}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                );
              })}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Mobile */}
      <div className="relative md:hidden">
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
          <div className="absolute top-full -right-3 mt-2 bg-white dark:bg-zinc-800 p-4 w-[90svw] rounded-xl shadow-lg z-[9999]">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {items.map((item: Item) => {
                    return (
                      <Link
                        href={item.link}
                        legacyBehavior
                        passHref
                        key={item.title}
                      >
                        <NavigationMenuLink
                          onClick={() => setIsOpen(!isOpen)}
                          className={navigationMenuTriggerStyle()}
                          target={item.open_in_new_tab ? "_blank" : ""}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    );
                  })}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </>
  );
}

export function FooterNavMenu({ items }: { items: Item[] }) {
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem className="grid grid-cols-3 md:grid-cols-none md:flex">
          {items.map((item: Item) => {
            return (
              <Link href={item.link} legacyBehavior passHref key={item.title}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  target={item.open_in_new_tab ? "_blank" : ""}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            );
          })}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
