import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminSubmissionsList() {
  await dbConnect();
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <AdminHeader
        breadcrumb="Content"
        title="Contact Inquiries"
        action={
          <span className="text-sm text-white/30">{submissions.length} total</span>
        }
      />

      <div className="px-8 space-y-3 pb-12">
        {submissions.length === 0 && (
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-16 text-center text-white/30 text-sm">
            No inquiries received yet.
          </div>
        )}

        {submissions.map((sub: any) => (
          <details
            key={sub._id}
            className="bg-[#0a0a0a] border border-white/10 rounded-sm group overflow-hidden"
          >
            <summary className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors list-none">
              {/* Date */}
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-white/50 text-xs font-medium">
                  {new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </div>
                <div className="text-white/25 text-[10px]">
                  {new Date(sub.createdAt).getFullYear()}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/10 flex-shrink-0" />

              {/* Name + Subject */}
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm truncate">{sub.fullName}</div>
                <div className="text-white/40 text-xs truncate mt-0.5">{sub.subject}</div>
              </div>

              {/* Email */}
              <div className="hidden md:block text-white/40 text-sm flex-shrink-0 truncate max-w-[200px]">
                {sub.email}
              </div>

              {/* Project type */}
              {sub.projectType && (
                <span className="hidden lg:inline-flex px-2 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] rounded-sm flex-shrink-0">
                  {sub.projectType}
                </span>
              )}

              {/* Status */}
              <StatusBadge status={sub.status || "new"} className="flex-shrink-0" />

              {/* Expand indicator */}
              <svg
                className="w-4 h-4 text-white/20 flex-shrink-0 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            {/* Expanded details */}
            <div className="border-t border-white/10 px-6 py-5 bg-white/[0.01] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Contact</p>
                  <p className="text-white/70">{sub.email}</p>
                  {sub.phone && <p className="text-white/50">{sub.phone}</p>}
                </div>
                {sub.projectType && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Project Type</p>
                    <p className="text-white/70">{sub.projectType}</p>
                  </div>
                )}
              </div>
              {sub.message && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">Message</p>
                  <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                </div>
              )}
              <div className="text-[10px] text-white/20">
                Received: {new Date(sub.createdAt).toLocaleString()}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
