import dbConnect from "@/lib/mongodb";
import Role from "@/lib/models/Role";
import AdminUser from "@/lib/models/AdminUser";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";

async function getRolesWithCount() {
  await dbConnect();
  const roles = await Role.find().sort({ name: 1 }).lean();

  // Count users per role
  const counts = await Promise.all(
    roles.map((r) =>
      AdminUser.countDocuments({ role: r._id }).then((count) => ({ id: String(r._id), count }))
    )
  );
  const countMap = Object.fromEntries(counts.map((c) => [c.id, c.count]));

  return roles.map((r) => ({ ...r, userCount: countMap[String(r._id)] || 0 }));
}

export default async function AdminRolesPage() {
  const roles = await getRolesWithCount();

  return (
    <div>
      <AdminHeader
        breadcrumb="Admin"
        title="Roles"
        action={
          <Link
            href="/admin/roles/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm transition-colors"
          >
            + Add Role
          </Link>
        }
      />
      <div className="px-8">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Role</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Permissions</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Users</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-white/40 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {roles.map((role: any) => (
                <tr key={role._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{role.name}</div>
                    <div className="text-white/30 text-xs font-mono mt-0.5">{role.slug}</div>
                    {role.description && (
                      <div className="text-white/40 text-xs mt-1">{role.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-sm">
                      {role.permissions.slice(0, 4).map((perm: string) => (
                        <span
                          key={perm}
                          className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[10px] rounded-sm font-mono"
                        >
                          {perm}
                        </span>
                      ))}
                      {role.permissions.length > 4 && (
                        <span className="text-white/30 text-xs">+{role.permissions.length - 4} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/60 text-sm">{role.userCount} user{role.userCount !== 1 ? "s" : ""}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/roles/${role._id}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {roles.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-white/30 text-sm">No roles found.</p>
              <Link href="/admin/roles/new" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300">
                Create the first role →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
