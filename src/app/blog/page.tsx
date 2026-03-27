// src/app/blog/page.tsx

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import BlogHero from "@/components/blog/BlogHero";
import BlogListingClient from "@/components/blog/BlogListingClient";

import { homeData } from "@/data/home";
import { blogPageContent as staticBlogPageContent, BlogPageContent } from "@/data/blogPageContent";
import { getPublishedPosts, getCategories } from "@/lib/blog";
import { getPageContent } from "@/lib/getPageContent";

export default async function BlogPage() {
  const blogPageContent = await getPageContent<BlogPageContent>("blog", staticBlogPageContent);
  const posts = await getPublishedPosts();
  const categories = await getCategories();

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />

      <SectionBackgroundShell>
        <BlogHero hero={blogPageContent.hero} />

        <BlogListingClient
          posts={posts}
          categories={categories}
          section={blogPageContent.featuredSection}
          categoriesBar={blogPageContent.categoriesBar}
        />
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
