import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";
import AdminHeader from "@/components/admin/AdminHeader";

async function getSubmissions() {
  await dbConnect();
  return await ContactSubmission.find().sort({ createdAt: -1 }).lean();
}

export default async function AdminSubmissionsList() {
  const submissions = await getSubmissions();

  return (
    <div>
      <AdminHeader title="Contact Inquiries" />
      
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Date</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Name</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Email</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Project Type</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-widest text-white/40 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.map((sub: any) => (
                <tr key={sub._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-white/40 text-sm whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleDateString()}
                    <span className="block text-[10px] text-white/20">
                      {new Date(sub.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{sub.fullName}</div>
                    <div className="text-white/30 text-xs mt-1">{sub.subject}</div>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {sub.email}
                    <span className="block text-white/30 text-xs">{sub.phone}</span>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">{sub.projectType}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wide rounded bg-blue-500/10 text-blue-400">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {submissions.length === 0 && (
            <div className="p-12 text-center text-white/40">
              No inquiries found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
