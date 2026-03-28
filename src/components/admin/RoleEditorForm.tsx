"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "@/lib/permissions";

interface RoleEditorFormProps {
  initialData?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    permissions: string[];
  };
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Permission groups for the checkbox UI
const PERMISSION_GROUPS = [
  {
    label: "Dashboard",
    permissions: [PERMISSIONS.VIEW_DASHBOARD],
  },
  {
    label: "Pages",
    permissions: [PERMISSIONS.MANAGE_PAGES, PERMISSIONS.MANAGE_PAGE_DRAFTS],
  },
  {
    label: "Submissions",
    permissions: [PERMISSIONS.VIEW_SUBMISSIONS, PERMISSIONS.VIEW_SUBMISSION_DETAILS],
  },
  {
    label: "Blog",
    permissions: [PERMISSIONS.MANAGE_BLOG_POSTS, PERMISSIONS.MANAGE_BLOG_CATEGORIES],
  },
  {
    label: "Projects",
    permissions: [PERMISSIONS.MANAGE_PROJECTS],
  },
  {
    label: "Admin",
    permissions: [PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_ROLES, PERMISSIONS.FULL_ACCESS],
  },
];

const PERMISSION_LABELS: Record<string, string> = {
  view_dashboard: "View Dashboard",
  manage_pages: "Manage Pages",
  manage_page_drafts: "Manage Page Drafts",
  view_submissions: "View Submissions",
  view_submission_details: "View Submission Details",
  manage_blog_posts: "Manage Blog Posts",
  manage_blog_categories: "Manage Blog Categories",
  manage_projects: "Manage Projects",
  manage_users: "Manage Users",
  manage_roles: "Manage Roles",
  full_access: "Full Access (All Permissions)",
};

export default function RoleEditorForm({ initialData }: RoleEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [slugManual, setSlugManual] = useState(isEdit);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    initialData?.permissions || []
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugManual) setSlug(toSlug(val));
  };

  const togglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !slug.trim()) {
      setError("Name and slug are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = { name, slug, description, permissions: selectedPermissions };
      const url = isEdit ? `/api/admin/roles/${initialData!._id}` : "/api/admin/roles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to save role");

      router.push("/admin/roles");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?._id) return;
    if (!confirm(`Delete role "${initialData.name}"? You cannot delete a role that has users assigned to it.`)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/roles/${initialData._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      router.push("/admin/roles");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          Role Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. Content Manager"
          required
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          Slug <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
            placeholder="content-manager"
            required
            className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm font-mono text-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
          />
          <button
            type="button"
            onClick={() => { setSlug(toSlug(name)); setSlugManual(false); }}
            className="px-3 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs rounded-sm transition-colors whitespace-nowrap"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of this role's purpose"
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Permissions */}
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">
            Permissions
          </label>
          <p className="text-xs text-white/30">
            {selectedPermissions.length} permission{selectedPermissions.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm divide-y divide-white/5 overflow-hidden">
          {PERMISSION_GROUPS.map((group) => (
            <div key={group.label} className="p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">
                {group.label}
              </p>
              <div className="space-y-2">
                {group.permissions.map((perm) => {
                  const checked = selectedPermissions.includes(perm);
                  return (
                    <label
                      key={perm}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() => togglePermission(perm)}
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                          checked
                            ? "bg-cyan-600 border-cyan-500"
                            : "bg-transparent border-white/20 group-hover:border-white/40"
                        }`}
                      >
                        {checked && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => togglePermission(perm)}
                        className={`text-sm transition-colors ${
                          checked ? "text-white" : "text-white/50 group-hover:text-white/70"
                        }`}
                      >
                        {PERMISSION_LABELS[perm] || perm}
                      </span>
                      {perm === PERMISSIONS.FULL_ACCESS && (
                        <span className="ml-auto text-[10px] text-cyan-400 uppercase tracking-wider">
                          Grants all
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2 text-red-400 hover:text-red-300 text-sm transition-colors disabled:opacity-40"
            >
              Delete Role
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Role"}
          </button>
        </div>
      </div>
    </form>
  );
}
