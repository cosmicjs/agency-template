"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostType } from "@/components/blog-card";

function CategoryFilter({
  posts,
  onCategoryChange,
}: {
  posts: PostType[];
  onCategoryChange: (category: string) => void;
}) {
  return (
    <Select onValueChange={(e) => onCategoryChange(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {posts
            .flatMap((post: PostType) =>
              post.metadata.categories.map((category: any) => category.title),
            )
            .reduce(
              (unique: any, item: any) =>
                unique.includes(item) ? unique : [...unique, item],
              [],
            )
            .map((category: any) => {
              return <SelectItem value={category}>{category}</SelectItem>;
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
