import { headers } from 'next/headers';
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { AdminTokenPayload } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The middleware injects x-admin-user as a JSON string for every /admin/* request
  const headerStore = await headers();
  const userHeader = headerStore.get('x-admin-user');

  let user: AdminTokenPayload | null = null;
  if (userHeader) {
    try {
      user = JSON.parse(userHeader) as AdminTokenPayload;
    } catch {
      // malformed header — treat as unauthenticated
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar user={user} />
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}
