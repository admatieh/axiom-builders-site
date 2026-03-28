import AdminHeader from "@/components/admin/AdminHeader";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/lib/models/BlogPost";
import Link from "next/link";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminBlogPostsList() {
  await dbConnect();
  const posts = await BlogPost.find({}).sort({ updatedAt: -1, createdAt: -1 }).lean();

  return (
    <div>
      <AdminHeader
        breadcrumb="Blog"
        title="Blog Posts"
        action={
          <Link
            href="/admin/blog-posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm transition-colors"
          >
            + New Post
          </Link>
        }
      />
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Title</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Featured</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Updated</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-white/40 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{post.title}</div>
                    <div className="text-white/30 text-[11px] font-mono mt-0.5">/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-white/50 text-sm">{post.categorySlug || "—"}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-4">
                    {post.featured ? (
                      <span className="text-yellow-400 text-sm">★</span>
                    ) : (
                      <span className="text-white/20 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/blog-posts/${post._id}`} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        Edit
                      </Link>
                      <DeleteBlogPostButton postId={String(post._id)} compact />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-white/30 text-sm">No blog posts yet.</p>
              <Link href="/admin/blog-posts/new" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300">
                Write your first post →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
