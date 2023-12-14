// components/nav-menu.tsx
'use client';

import Link from 'next/link';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

type Item = { title: string; link: string; open_in_new_tab: boolean };

export function NavMenu({ items }: { items: Item[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {items.map((item: Item) => {
            return (
              <Link href={item.link} legacyBehavior passHref key={item.title}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} target={item.open_in_new_tab ? '_blank' : ''}>
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
