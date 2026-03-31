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
  /** Current user's own permissions — used to hide Delete if they lack delete_roles */
  userPermissions?: string[];
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

/** Each group: label + its action-level permissions in display order */
const PERMISSION_GROUPS: { label: string; permissions: string[] }[] = [
  {
    label: "Dashboard",
    permissions: [PERMISSIONS.VIEW_DASHBOARD],
  },
  {
    label: "Pages",
    permissions: [
      PERMISSIONS.VIEW_PAGES,
      PERMISSIONS.UPDATE_PAGES,
      PERMISSIONS.PUBLISH_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
    ],
  },
  {
    label: "Submissions",
    permissions: [
      PERMISSIONS.VIEW_SUBMISSIONS,
      PERMISSIONS.VIEW_SUBMISSION_DETAILS,
      PERMISSIONS.UPDATE_SUBMISSIONS_STATUS,
      PERMISSIONS.DELETE_SUBMISSIONS,
    ],
  },
  {
    label: "Blog Posts",
    permissions: [
      PERMISSIONS.VIEW_BLOG_POSTS,
      PERMISSIONS.CREATE_BLOG_POSTS,
      PERMISSIONS.UPDATE_BLOG_POSTS,
      PERMISSIONS.PUBLISH_BLOG_POSTS,
      PERMISSIONS.DELETE_BLOG_POSTS,
    ],
  },
  {
    label: "Blog Categories",
    permissions: [
      PERMISSIONS.VIEW_BLOG_CATEGORIES,
      PERMISSIONS.CREATE_BLOG_CATEGORIES,
      PERMISSIONS.UPDATE_BLOG_CATEGORIES,
      PERMISSIONS.DELETE_BLOG_CATEGORIES,
    ],
  },
  {
    label: "Projects",
    permissions: [
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.UPDATE_PROJECTS,
      PERMISSIONS.PUBLISH_PROJECTS,
      PERMISSIONS.DELETE_PROJECTS,
    ],
  },
  {
    label: "Users",
    permissions: [
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.CREATE_USERS,
      PERMISSIONS.UPDATE_USERS,
      PERMISSIONS.DELETE_USERS,
    ],
  },
  {
    label: "Roles",
    permissions: [
      PERMISSIONS.VIEW_ROLES,
      PERMISSIONS.CREATE_ROLES,
      PERMISSIONS.UPDATE_ROLES,
      PERMISSIONS.DELETE_ROLES,
    ],
  },
  {
    label: "Super Access",
    permissions: [PERMISSIONS.FULL_ACCESS],
  },
];

const PERMISSION_LABELS: Record<string, string> = {
  view_dashboard:             "View Dashboard",
  view_pages:                 "View Pages",
  update_pages:               "Edit Pages",
  publish_pages:              "Publish Pages",
  manage_page_drafts:         "Manage Page Drafts",
  view_submissions:           "View Submissions",
  view_submission_details:    "View Submission Details",
  update_submissions_status:  "Update Submission Status",
  delete_submissions:         "Delete Submissions",
  view_blog_posts:            "View Blog Posts",
  create_blog_posts:          "Create Blog Posts",
  update_blog_posts:          "Edit Blog Posts",
  publish_blog_posts:         "Publish Blog Posts",
  delete_blog_posts:          "Delete Blog Posts",
  view_blog_categories:       "View Blog Categories",
  create_blog_categories:     "Create Blog Categories",
  update_blog_categories:     "Edit Blog Categories",
  delete_blog_categories:     "Delete Blog Categories",
  view_projects:              "View Projects",
  create_projects:            "Create Projects",
  update_projects:            "Edit Projects",
  publish_projects:           "Publish Projects",
  delete_projects:            "Delete Projects",
  view_users:                 "View Users",
  create_users:               "Create Users",
  update_users:               "Edit Users",
  delete_users:               "Delete Users",
  view_roles:                 "View Roles",
  create_roles:               "Create Roles",
  update_roles:               "Edit Roles",
  delete_roles:               "Delete Roles",
  full_access:                "Full Access — grants all permissions",
};

export default function RoleEditorForm({ initialData, userPermissions = [] }: RoleEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);

  const canDelete = userPermissions.includes(PERMISSIONS.FULL_ACCESS) || userPermissions.includes(PERMISSIONS.DELETE_ROLES);

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

  const toggleGroup = (groupPerms: string[]) => {
    const allSelected = groupPerms.every((p) => selectedPermissions.includes(p));
    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !groupPerms.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...groupPerms])]);
    }
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
    if (!confirm(`Delete role "${initialData.name}"? This cannot be undone.`)) return;
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
          placeholder="e.g. Blog Editor"
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
            placeholder="blog-editor"
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
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">
              Permissions
            </label>
            <p className="text-xs text-white/30">
              {selectedPermissions.length} permission{selectedPermissions.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPermissions(selectedPermissions.length === 0 ? [] : [])}
            className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm divide-y divide-white/5 overflow-hidden">
          {PERMISSION_GROUPS.map((group) => {
            const allChecked = group.permissions.every((p) => selectedPermissions.includes(p));
            const someChecked = group.permissions.some((p) => selectedPermissions.includes(p));

            return (
              <div key={group.label} className="p-4">
                {/* Group header */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                    {group.label}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.permissions)}
                    className={`text-[10px] transition-colors ${
                      allChecked
                        ? "text-cyan-400 hover:text-cyan-300"
                        : someChecked
                        ? "text-white/40 hover:text-white/60"
                        : "text-white/20 hover:text-white/40"
                    }`}
                  >
                    {allChecked ? "Clear all" : "Select all"}
                  </button>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 gap-1.5">
                  {group.permissions.map((perm) => {
                    const checked = selectedPermissions.includes(perm);
                    return (
                      <label
                        key={perm}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                        onClick={() => togglePermission(perm)}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
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
                        <span className={`text-sm transition-colors ${checked ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                          {PERMISSION_LABELS[perm] ?? perm}
                        </span>
                        {perm === PERMISSIONS.FULL_ACCESS && (
                          <span className="ml-auto text-[10px] text-cyan-400 uppercase tracking-wider flex-shrink-0">
                            Grants all
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div>
          {isEdit && canDelete && (
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
