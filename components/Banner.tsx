import { ChevronRight } from "lucide-react";

export default function Banner(): JSX.Element {
  return (
    <div className="flex justify-center mt-2">
      <a href="https://github.com/cosmicjs/blocks-demo" target="_parent">
        <div className="flex items-center space-x-1 bg-zinc-100 px-4 py-2 text-xs dark:bg-zinc-800 md:text-sm lg:text-base rounded-full">
          <span className="text-zinc-800 dark:text-zinc-200">
            Source code available on
          </span>
          <span className="text-green-500 font-medium dark:text-green-300">
            GitHub
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </a>
    </div>
  );
}
