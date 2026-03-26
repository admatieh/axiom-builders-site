"use client";

import Link from "next/link";
import { BlogPostType } from "@/lib/blog";

export default function FeaturedPost({
  post,
  section,
}: {
  post: BlogPostType;
  section?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}) {
  if (!post) return null;
  
  const categoryName = post.category?.name || post.categorySlug || "Insight";

  return (
    <section className="w-full px-6 sm:px-12 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          {section?.badge || "Featured Insight"}
        </div>

        {section?.title && (
          <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{section.title}</h2>
        )}

        {section?.subtitle && (
          <p className="text-sm text-white/50 mb-6 max-w-2xl">{section.subtitle}</p>
        )}

        <Link href={`/blog/${post.slug}`} className="block group">
          <div className="relative w-full aspect-video md:aspect-21/9 overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]">
            {/* Image Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${post.coverImage})` }} 
            />
            {/* Fallback gradient if image fails/missing */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 opacity-50 mix-blend-multiply" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-start gap-4">
              <span className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm rounded-full">
                {categoryName}
              </span>

              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight max-w-4xl group-hover:text-gray-100 transition-colors">
                {post.title}
              </h2>

              <p className="max-w-2xl text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-none font-light leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 mt-4 text-white text-xs uppercase tracking-widest font-medium group-hover:translate-x-2 transition-transform duration-300">
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
