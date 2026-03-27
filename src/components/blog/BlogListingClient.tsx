"use client";

import { useMemo, useState } from "react";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import { BlogPostType } from "@/lib/blog";

type BlogListingClientProps = {
  posts: BlogPostType[];
  categories: any[];
  section?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  categoriesBar?: {
    title?: string;
    categories?: string[];
  };
};

export default function BlogListingClient({
  posts,
  categories,
  section,
  categoriesBar,
}: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = useMemo(() => {
    if (!posts.length) return null;
    return posts.find((post) => post.featured) || posts[0];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;

    return posts.filter((post) => {
      const name = post.category?.name || "";
      const slug = post.categorySlug || "";
      return name === activeCategory || slug === activeCategory;
    });
  }, [activeCategory, posts]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((post) => post._id !== featuredPost._id);
  }, [featuredPost, filteredPosts]);

  return (
    <>
      {featuredPost && <FeaturedPost post={featuredPost} section={section} />}

      <BlogCategories
        categories={categories}
        barTitle={categoriesBar?.title}
        staticCategories={categoriesBar?.categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {filteredPosts.length === 0 ? (
        <section className="w-full px-6 sm:px-12 md:px-20 pb-20">
          <div className="max-w-7xl mx-auto border border-white/10 bg-[#0a0a0a] p-8 md:p-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">No Posts Found</p>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-3">No articles in this category yet.</h3>
            <p className="text-white/50 text-sm">Try another category or check back soon.</p>
          </div>
        </section>
      ) : (
        <BlogGrid posts={gridPosts} />
      )}
    </>
  );
}
