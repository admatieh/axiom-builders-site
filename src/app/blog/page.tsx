// src/app/blog/page.tsx

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";

import { homeData } from "@/data/home";
import { blogPageContent as staticBlogPageContent, BlogPageContent } from "@/data/blogPageContent";
import { getPublishedPosts, getCategories } from "@/lib/blog";
import { getPageContent } from "@/lib/getPageContent";

export default async function BlogPage() {
  const blogPageContent = await getPageContent<BlogPageContent>("blog", staticBlogPageContent);
  const posts = await getPublishedPosts();
  const categories = await getCategories();

  // Find the featured post, or default to the first one
  const featuredPost = posts.find((p: any) => p.featured) || posts[0];
  const otherPosts = posts.filter((p: any) => p._id !== featuredPost?._id);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />

      <SectionBackgroundShell>
        <BlogHero hero={blogPageContent.hero} />
        
        {featuredPost && (
           <FeaturedPost post={featuredPost} section={blogPageContent.featuredSection} />
        )}
        
        <BlogCategories
          categories={categories}
          barTitle={blogPageContent.categoriesBar?.title}
          staticCategories={blogPageContent.categoriesBar?.categories}
        />
        
        {/* Pass remaining posts to the grid */}
        <BlogGrid posts={otherPosts} />
      </SectionBackgroundShell>

      <Footer
        companyName={homeData.companyName}
        description={homeData.footer.description}
        metrics={homeData.footer.stats}
        links={homeData.footer.links}
        contact={homeData.footer.contact}
      />
    </main>
  );
}
