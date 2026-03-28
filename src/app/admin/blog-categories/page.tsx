import AdminHeader from "@/components/admin/AdminHeader";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import BlogPost from "@/lib/models/BlogPost";
import Link from "next/link";

export default async function AdminBlogCategoriesList() {
  await dbConnect();
  const categories = await BlogCategory.find({}).sort({ name: 1 }).lean();

  // Count posts per category
  const postCounts = await Promise.all(
    categories.map((cat) =>
      BlogPost.countDocuments({ categorySlug: cat.slug }).then((count) => ({
        id: String(cat._id),
        count,
      }))
    )
  );
  const countMap = Object.fromEntries(postCounts.map((c) => [c.id, c.count]));

  return (
    <div>
      <AdminHeader
        breadcrumb="Blog"
        title="Blog Categories"
        action={
          <Link
            href="/admin/blog-categories/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm transition-colors"
          >
            + New Category
          </Link>
        }
      />
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Name</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Slug</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Description</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Posts</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-white/40 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories.map((cat: any) => (
                <tr key={cat._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-white font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-white/40 font-mono text-sm">{cat.slug}</td>
                  <td className="px-6 py-4 text-white/40 text-sm max-w-xs truncate">{cat.description || "—"}</td>
                  <td className="px-6 py-4">
                    <span className="text-white/50 text-sm">{countMap[String(cat._id)] || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/blog-categories/${cat._id}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-white/30 text-sm">No categories yet.</p>
              <Link href="/admin/blog-categories/new" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300">
                Create the first category →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
