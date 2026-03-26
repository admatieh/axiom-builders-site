export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}

import AdminSidebar from "@/components/admin/AdminSidebar";
