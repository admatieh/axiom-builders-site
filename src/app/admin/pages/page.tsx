import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";

export default async function AdminPagesList() {
  await dbConnect();
  const pages = await PageContent.find().sort({ title: 1 }).lean();

  return (
    <div>
      <AdminHeader
        breadcrumb="Content"
        title="Pages"
        action={
          <span className="text-sm text-white/30">{pages.length} page{pages.length !== 1 ? "s" : ""}</span>
        }
      />

      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Title</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Slug</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Updated</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-white/40 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pages.map((page: any) => (
                <tr key={page._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-white font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-white/40 font-mono text-sm">{page.slug}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={page.status || "published"} />
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages.length === 0 && (
            <div className="p-16 text-center text-white/30 text-sm">
              No pages found. Run <code className="font-mono text-white/50">npm run seed</code> to populate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
