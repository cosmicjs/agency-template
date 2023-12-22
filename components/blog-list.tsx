"use client";

import React from "react";
import CategoryFilter from "./category-filter";
import { BlogCard, PostType } from "./blog-card";

function BlogList({ posts }: { posts: PostType[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) =>
          post.metadata.categories.some(
            (category) => category.title === selectedCategory,
          ),
        );

  return (
    <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
      <div className="flex justify-between w-full items-center">
        <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
          Blog
        </h1>
        <CategoryFilter posts={posts} onCategoryChange={setSelectedCategory} />
      </div>
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
        {filteredPosts.map((post: PostType) => {
          return <BlogCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}

export default BlogList;
