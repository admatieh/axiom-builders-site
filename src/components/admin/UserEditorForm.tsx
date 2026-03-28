"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Role {
  _id: string;
  name: string;
  slug: string;
}

interface UserEditorFormProps {
  roles: Role[];
  initialData?: {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    role: Role;
  };
}

export default function UserEditorForm({ roles, initialData }: UserEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);

  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(initialData?.role?._id || roles[0]?._id || "");
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !roleId) {
      setError("Name, email, and role are required.");
      return;
    }
    if (!isEdit && !password) {
      setError("Password is required for new users.");
      return;
    }

    setSaving(true);
    try {
      const payload: any = { name, email, roleId, isActive };
      if (password) payload.password = password;

      const url = isEdit
        ? `/api/admin/users/${initialData!._id}`
        : "/api/admin/users";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to save user");

      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?._id) return;
    if (!confirm(`Delete user "${initialData.name}"? This cannot be undone.`)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${initialData._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      router.push("/admin/users");
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
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          required
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@axiombuilders.com"
          required
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          {isEdit ? "New Password" : "Password"}{" "}
          {!isEdit && <span className="text-red-400">*</span>}
        </label>
        {isEdit && (
          <p className="text-xs text-white/40">Leave blank to keep the current password.</p>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isEdit ? "Leave blank to keep current" : "Set a strong password"}
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
          Role <span className="text-red-400">*</span>
        </label>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-cyan-500 outline-none transition-colors"
        >
          <option value="">Select a role…</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3 py-4 border-t border-white/5">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            isActive ? "bg-cyan-600" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-white/70">
          {isActive ? "Account is active" : "Account is deactivated"}
        </span>
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
              Delete User
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      </div>
    </form>
  );
}
