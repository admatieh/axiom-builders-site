import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { homeData } from "@/data/home";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";

function toPlainTextParagraphs(content: string) {
  const normalized = String(content || "")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*\/p\s*>/gi, "\n\n")
    .replace(/<\s*\/h[1-6]\s*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r\n/g, "\n")
    .trim();

  return normalized
    .split(/\n\s*\n|\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const paragraphs = toPlainTextParagraphs(post?.content || "");
  const galleryImages = Array.isArray(post?.galleryImages) ? post.galleryImages : [];

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
          <div className="max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${post._id}-paragraph-${index}`}
                className="text-gray-300 leading-relaxed font-light text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {galleryImages.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-10">
              <div className="mb-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Gallery</p>
                <h2 className="text-2xl md:text-3xl font-light text-white mt-2">Project Visuals</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image: string, index: number) => (
                  <div
                    key={`${post._id}-gallery-${index}`}
                    className="group relative aspect-4/3 overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]"
                  >
                    <img
                      src={image}
                      alt={`${post.title} gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </section>
          )}

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
