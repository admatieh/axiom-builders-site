"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wider text-white">
          AXIOM <span className="text-cyan-300">ADMIN</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <AdminLink href="/admin" label="Dashboard" active={pathname === '/admin'} />
        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Content</p>
        </div>
        <AdminLink href="/admin/pages" label="Pages" active={pathname.startsWith('/admin/pages')} />
        <AdminLink href="/admin/submissions" label="Submissions" active={pathname.startsWith('/admin/submissions')} />
        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">Blog</p>
        </div>
        <AdminLink href="/admin/blog-posts" label="Blog Posts" active={pathname.startsWith('/admin/blog-posts')} />
        <AdminLink href="/admin/blog-categories" label="Blog Categories" active={pathname.startsWith('/admin/blog-categories')} />
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button 
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }}
          className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Logout
        </button>
        <Link href="/" className="block px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}

function AdminLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`block px-4 py-3 text-sm rounded transition-colors ${
        active 
          ? 'bg-cyan-900/20 text-cyan-300 border-l-2 border-cyan-500' 
          : 'text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
      }`}
    >
      {label}
    </Link>
  );
}
