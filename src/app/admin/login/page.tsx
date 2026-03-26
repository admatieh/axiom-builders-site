"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-sm shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-white">
            AXIOM <span className="text-cyan-300">ADMIN</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-cyan-300 outline-none transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>
        
        <div className="mt-8 text-center">
             <a href="/" className="text-white/20 hover:text-white/60 text-xs transition-colors">← Return to Website</a>
        </div>
      </div>
    </div>
  );
}
