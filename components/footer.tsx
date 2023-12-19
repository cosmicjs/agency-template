// components/footer.tsx
import { cosmic } from "@/lib/cosmic";
import { FooterNavMenu } from "@/components/nav-menu";

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
    <div className="my-10 mx-auto justify-center w-full">
      <div className="my-8">
        <FooterNavMenu items={footer.metadata.items} />
      </div>
      <div className="mb-8 flex gap-x-8 justify-center">
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
      <div className="flex gap-x-8 justify-center text-zinc-700 dark:text-zinc-300">
        <div>
          <a href={`mailto:${settings.metadata.email}`}>Email us</a>
        </div>
        <div>
          <a href={`tel:${settings.metadata.phone}`}>Call us</a>
        </div>
      </div>
    </div>
  );
}
