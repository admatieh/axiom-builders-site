import AdminHeader from "@/components/admin/AdminHeader";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/lib/models/BlogPost";
import Link from "next/link";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

export default async function AdminBlogPostsList() {
  await dbConnect();
  const posts = await BlogPost.find({})
    .sort({ updatedAt: -1, createdAt: -1 })
    .lean();

  return (
    <div>
      <AdminHeader title="Blog Posts Manager" />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-light tracking-wide">All Blog Posts</h2>
          <Link
            href="/admin/blog-posts/new"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold uppercase tracking-widest rounded-sm"
          >
            Add New Post
          </Link>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-widest text-xs font-semibold text-white/60">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-white/2">
                  <td className="px-6 py-4 font-medium text-white">
                    <div>{post.title}</div>
                    <div className="text-[11px] text-white/30 font-mono mt-1">/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4">{post.categorySlug || "uncategorized"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border ${
                      post.status === 'published' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{post.featured ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Link href={`/admin/blog-posts/${post._id}`} className="text-cyan-300 hover:text-cyan-200 text-sm font-medium">
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
            <div className="p-12 text-center text-white/40">
              No blog posts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
