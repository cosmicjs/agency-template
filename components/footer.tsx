// components/footer.tsx
import { cosmic } from "@/cosmic/client";
import { FooterNavMenu } from "@/components/nav-menu";
import { buttonVariants } from "./ui/button";
import { MailIcon, PhoneIcon } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

export default async function Footer() {
  // Footer data
  const { object: footer } = await cosmic.objects
    .findOne({
      type: "navigation-menus",
      slug: "footer",
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

  type Link = {
    url: string;
    company: string;
    icon: {
      imgix_url: string;
    };
  };

  return (
    <div className="pb-8 md:my-10 mx-auto flex flex-col lg:flex-row items-center justify-between container w-full">
      <div className="my-8">
        <FooterNavMenu items={footer.metadata.items} />
      </div>
      <div className="flex mb-6 lg:mb-0 gap-x-8 justify-center text-zinc-700 dark:text-zinc-300">
        <div>
          <a
            href={`mailto:${settings.metadata.email}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <MailIcon className="w-4 inline-block mr-2" />
            Email us
          </a>
        </div>
        <div>
          <a
            href={`tel:${settings.metadata.phone}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <PhoneIcon className="w-4 inline-block mr-2" />
            Call us
          </a>
        </div>
      </div>
      <div className="flex gap-x-8 justify-center mb-6 lg:mb-0">
        {settings.metadata.links.map((link: Link) => {
          return (
            <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
              <img
                className="h-[26px]"
                src={`${link.icon.imgix_url}?w=500&auto=format,compression`}
                alt={link.company}
              />
            </a>
          );
        })}
      </div>
      <ModeToggle />
    </div>
  );
}
