import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";

async function getPages() {
  await dbConnect();
  // Return plain objects to avoid serialization issues
  return await PageContent.find().sort({ title: 1 }).lean();
}

export default async function AdminPagesList() {
  const pages = await getPages();

  return (
    <div>
      <AdminHeader title="Page Management" />
      
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Title</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Slug</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Status</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Last Updated</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pages.map((page: any) => (
                <tr key={page._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-white/60 font-mono text-sm">{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wide rounded ${
                      page.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/pages/${page.slug}`}
                      className="text-cyan-300 hover:text-cyan-200 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {pages.length === 0 && (
            <div className="p-12 text-center text-white/40">
              No pages found. Run the seed script to populate content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
