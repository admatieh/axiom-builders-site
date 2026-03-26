import AdminHeader from "@/components/admin/AdminHeader";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import Link from "next/link";

export default async function AdminBlogCategoriesList() {
  await dbConnect();
  const categories = await BlogCategory.find({})
    .sort({ name: 1 })
    .lean();

  return (
    <div>
      <AdminHeader title="Blog Categories Manager" />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-light tracking-wide">All Blog Categories</h2>
          <Link 
            href="/admin/blog-categories/new" 
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold uppercase tracking-widest rounded-sm transition-colors"
          >
            Create New Category
          </Link>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-widest text-xs font-semibold text-white/60">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories.map((cat: any) => (
                <tr key={cat._id} className="hover:bg-white/2">
                  <td className="px-6 py-4 font-medium text-white">
                    <Link href={`/admin/blog-categories/${cat._id}`} className="hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{cat.slug}</td>
                  <td className="px-6 py-4">{cat.description}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/blog-categories/${cat._id}`} className="text-cyan-300 hover:text-cyan-200 text-sm font-medium">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="p-12 text-center text-white/40">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
