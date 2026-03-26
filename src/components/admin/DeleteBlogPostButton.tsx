"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBlogPostButton({
  postId,
  compact = false,
  redirectTo,
}: {
  postId: string;
  compact?: boolean;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This action cannot be undone.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog-posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to delete post");
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to delete post");
      setDeleting(false);
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-400 hover:text-red-300 text-sm font-medium disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-sm rounded disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
