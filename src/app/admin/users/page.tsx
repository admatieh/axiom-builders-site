import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/models/AdminUser";
import Role from "@/lib/models/Role";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";
import { headers } from "next/headers";
import { getUserFromHeader, hasPermission, PERMISSIONS } from "@/lib/permissions";

async function getUsers() {
  await dbConnect();
  void Role.modelName;
  return AdminUser.find()
    .populate<{ role: { name: string; slug: string } }>({ path: "role", model: Role })
    .sort({ createdAt: -1 })
    .lean();
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  const headerStore = await headers();
  const user = getUserFromHeader(headerStore);
  const perms = user?.permissions ?? [];
  const canCreate = hasPermission(perms, PERMISSIONS.CREATE_USERS);
  const canUpdate = hasPermission(perms, PERMISSIONS.UPDATE_USERS);

  return (
    <div>
      <AdminHeader
        breadcrumb="Admin"
        title="Admin Users"
        action={
          canCreate ? (
            <Link
              href="/admin/users/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm transition-colors"
            >
              + Add User
            </Link>
          ) : undefined
        }
      />
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">User</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Role</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Created</th>
                {canUpdate && (
                  <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-white/40 font-semibold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u: any) => (
                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{u.name}</div>
                    <div className="text-white/40 text-xs mt-0.5">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-sm capitalize">
                      {u.role?.name || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={u.isActive ? "active" : "inactive"} />
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  {canUpdate && (
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/users/${u._id}`}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Edit
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-white/30 text-sm">No admin users found.</p>
              {canCreate && (
                <Link href="/admin/users/new" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300">
                  Create the first user →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
