// components/product-card.tsx
import Link from "next/link";

export type ProjectType = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    image: {
      imgix_url?: string;
    };
    summary: string;
    client: {
      title: string;
    };
    content: number;
  };
};

export function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <Link href={`/work/`} className="group relative w-full">
      <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        {project.metadata.image?.imgix_url && (
          <img
            src={`${project.metadata.image.imgix_url}?w=1200&auto=format,compression`}
            alt={project.title}
            className="h-full w-full object-cover object-center aspect-square lg:h-full lg:w-full border border-zinc-100 dark:border-zinc-800"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-lg font-medium leading-tight text-zinc-700 dark:text-zinc-300">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {project.title}
          </h3>
        </div>
      </div>
      <p
        className="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: project.metadata.summary }}
      />
      <p className="pt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {project.metadata.client.title}
      </p>
    </Link>
  );
}
