import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import ContactSubmission from "@/lib/models/ContactSubmission";
import AdminHeader from "@/components/admin/AdminHeader";
import SummaryCard from "@/components/admin/SummaryCard";

async function getStats() {
  await dbConnect();
  
  const pageCount = await PageContent.countDocuments();
  const submissionCount = await ContactSubmission.countDocuments();
  const recentSubmission = await ContactSubmission.findOne().sort({ createdAt: -1 }).lean() as any;

  return {
    pageCount,
    submissionCount,
    lastSubmissionDate: recentSubmission ? new Date(recentSubmission.createdAt).toLocaleDateString() : 'None',
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <AdminHeader title="Dashboard Overview" />
      
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard 
          label="Total Pages" 
          value={stats.pageCount} 
          subtext="Active content pages"
        />
        <SummaryCard 
          label="Inquiries" 
          value={stats.submissionCount} 
          subtext="Total contact submissions"
        />
        <SummaryCard 
          label="Last Activity" 
          value={stats.lastSubmissionDate} 
          subtext="Most recent inquiry"
        />
      </div>

      <div className="px-8 mt-12">
        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm">
          <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <a href="/admin/pages" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors">
              Manage Pages
            </a>
            <a href="/admin/submissions" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors">
              View Inquiries
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
