"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type BlogPostFormData = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  readingTime: string;
  featured: boolean;
  status: "draft" | "published";
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BlogPostEditorForm({
  categories,
  initialData,
}: {
  categories: Category[];
  initialData?: Partial<BlogPostFormData>;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState<BlogPostFormData>({
    _id: initialData?._id,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    categoryId: initialData?.categoryId || categories[0]?._id || "",
    readingTime: initialData?.readingTime || "5 min read",
    featured: Boolean(initialData?.featured),
    status: (initialData?.status as "draft" | "published") || "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === form.categoryId),
    [categories, form.categoryId]
  );

  const updateField = (name: keyof BlogPostFormData, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitWithStatus = async (status: "draft" | "published") => {
    setError("");

    if (!form.title.trim()) return setError("Title is required.");
    if (!form.excerpt.trim()) return setError("Excerpt is required.");
    if (!form.content.trim()) return setError("Content is required.");
    if (!form.categoryId) return setError("Category is required.");

    const payload = {
      ...form,
      status,
      slug: form.slug.trim() ? form.slug.trim() : toSlug(form.title),
    };

    if (!payload.slug) {
      setError("Slug is required. Add a title or slug.");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/blog-posts/${form._id}`
        : "/api/admin/blog-posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to save post");

      router.push("/admin/blog-posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save post");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm space-y-5">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Title *</label>
            <input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Slug *</label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => updateField("slug", toSlug(form.title))}
                className="px-3 py-2 bg-white/5 border border-white/10 text-white/80 text-xs rounded"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Excerpt *</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={3}
            className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Content *</label>
          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            rows={14}
            className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Cover Image</label>
            <input
              value={form.coverImage}
              onChange={(e) => updateField("coverImage", e.target.value)}
              placeholder="/images/blog/my-image.jpg"
              className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Reading Time</label>
            <input
              value={form.readingTime}
              onChange={(e) => updateField("readingTime", e.target.value)}
              placeholder="5 min read"
              className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Category *</label>
            <select
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} ({cat.slug})
                </option>
              ))}
            </select>
            {selectedCategory && (
              <p className="text-xs text-white/40 mt-1">Stored slug: {selectedCategory.slug}</p>
            )}
          </div>

          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
              />
              Featured Post
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            {isEdit && <DeleteBlogPostButton postId={String(form._id)} redirectTo="/admin/blog-posts" />}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => submitWithStatus("draft")}
              disabled={loading}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => submitWithStatus("published")}
              disabled={loading}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
