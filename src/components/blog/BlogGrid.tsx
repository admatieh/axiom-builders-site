"use client";

import { BlogPostType } from "@/lib/blog";
import Link from "next/link";
import Surface from "@/components/ui/Surface";

export default function BlogGrid({ posts }: { posts: BlogPostType[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full px-6 sm:px-12 md:px-20 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const categoryName = post.category?.name || post.categorySlug || "Insight";
          const formattedDate = post.publishedAt 
            ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "";

          return (
          <div key={post._id} className="group flex flex-col h-full">
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Surface
                level={2}
                className="h-full flex flex-col border-white/5 hover:border-white/20 transition-colors duration-500 bg-[#0a0a0a]"
              >
                {/* Image Area */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-white/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Category Badge Floating */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-widest text-white/80 rounded-sm">
                      {categoryName}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-white/30 text-[10px] uppercase tracking-widest mb-3 font-mono">
                      <span>{formattedDate}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                      Read Article
                    </span>
                    <div className="w-8 h-px bg-white/20 group-hover:bg-cyan-500 group-hover:w-12 transition-all duration-300" />
                  </div>
                </div>
              </Surface>
            </Link>
          </div>
          );
        })}
      </div>
    </section>
  );
}
