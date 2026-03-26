import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { homeData } from "@/data/home";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar companyName={homeData.companyName} navItems={homeData.navItems} />

      <SectionBackgroundShell>
        <article className="pt-[20vh] pb-24 px-6 md:px-20 max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-12">
            <div className="flex items-center gap-4 mb-8 text-xs font-mono uppercase tracking-widest text-white/40">
               <Link href="/blog" className="hover:text-cyan-400 transition-colors">Journal</Link>
               <span>/</span>
               <span className="text-cyan-400">{post.category?.name || "Uncategorized"}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 text-white">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-white/50 font-mono uppercase tracking-widest">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="w-full aspect-video relative mb-16 rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a]">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${post.coverImage})` }} 
             />
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-light prose-headings:tracking-tight 
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
              prose-strong:text-white prose-strong:font-medium
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
              prose-img:rounded-sm prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>
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
