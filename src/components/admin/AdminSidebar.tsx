"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { AdminTokenPayload } from '@/lib/auth';
import { PERMISSIONS, hasPermission } from '@/lib/permissions';

interface AdminSidebarProps {
  user: AdminTokenPayload | null;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const perms = user?.permissions ?? [];

  const can = (permission: string) =>
    perms.includes(PERMISSIONS.FULL_ACCESS) || perms.includes(permission as any);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 bg-[#080808] border-r border-white/[0.07] flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.07]">
        <h1 className="text-base font-bold tracking-[0.2em] text-white">
          AXIOM <span className="text-cyan-400">ADMIN</span>
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">

        {/* Dashboard */}
        <div className="px-3 mb-1">
          <AdminLink href="/admin" label="Dashboard" active={pathname === '/admin'} />
        </div>

        {/* Content */}
        {(can(PERMISSIONS.MANAGE_PAGES) || can(PERMISSIONS.VIEW_SUBMISSIONS) || can(PERMISSIONS.MANAGE_PROJECTS)) && (
          <>
            <SectionLabel label="Content" />
            <div className="px-3 space-y-0.5">
              {can(PERMISSIONS.MANAGE_PAGES) && (
                <AdminLink href="/admin/pages" label="Pages" active={pathname.startsWith('/admin/pages')} />
              )}
              {can(PERMISSIONS.VIEW_SUBMISSIONS) && (
                <AdminLink href="/admin/submissions" label="Submissions" active={pathname.startsWith('/admin/submissions')} />
              )}
              {can(PERMISSIONS.MANAGE_PROJECTS) && (
                <AdminLink href="/admin/projects" label="Projects" active={pathname.startsWith('/admin/projects')} />
              )}
            </div>
          </>
        )}

        {/* Blog */}
        {(can(PERMISSIONS.MANAGE_BLOG_POSTS) || can(PERMISSIONS.MANAGE_BLOG_CATEGORIES)) && (
          <>
            <SectionLabel label="Blog" />
            <div className="px-3 space-y-0.5">
              {can(PERMISSIONS.MANAGE_BLOG_POSTS) && (
                <AdminLink href="/admin/blog-posts" label="Blog Posts" active={pathname.startsWith('/admin/blog-posts')} />
              )}
              {can(PERMISSIONS.MANAGE_BLOG_CATEGORIES) && (
                <AdminLink href="/admin/blog-categories" label="Blog Categories" active={pathname.startsWith('/admin/blog-categories')} />
              )}
            </div>
          </>
        )}

        {/* Admin */}
        {(can(PERMISSIONS.MANAGE_USERS) || can(PERMISSIONS.MANAGE_ROLES)) && (
          <>
            <SectionLabel label="Admin" />
            <div className="px-3 space-y-0.5">
              {can(PERMISSIONS.MANAGE_USERS) && (
                <AdminLink href="/admin/users" label="Users" active={pathname.startsWith('/admin/users')} />
              )}
              {can(PERMISSIONS.MANAGE_ROLES) && (
                <AdminLink href="/admin/roles" label="Roles" active={pathname.startsWith('/admin/roles')} />
              )}
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.07] p-4 space-y-3">
        {/* User identity */}
        {user && (
          <div className="px-3 py-2.5 bg-white/[0.03] rounded-sm border border-white/[0.06]">
            <p className="text-sm text-white font-medium truncate leading-tight">{user.name}</p>
            <p className="text-[10px] text-cyan-400/80 mt-0.5 capitalize tracking-wide">
              {user.roleSlug.replace(/-/g, ' ')}
            </p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={handleLogout}
            className="flex-1 text-left px-3 py-2 text-sm text-red-400/80 hover:text-red-300 hover:bg-white/[0.03] rounded-sm transition-colors"
          >
            Sign Out
          </button>
          <Link
            href="/"
            className="px-3 py-2 text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.03] rounded-sm transition-colors whitespace-nowrap"
          >
            ← Site
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-6 pt-5 pb-2">
      <p className="text-[9px] uppercase tracking-[0.15em] text-white/25 font-semibold">{label}</p>
    </div>
  );
}

function AdminLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-all ${
        active
          ? 'bg-cyan-500/10 text-cyan-300 font-medium'
          : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
      }`}
    >
      {active && <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />}
      {!active && <span className="w-1 h-1 flex-shrink-0" />}
      {label}
    </Link>
  );
}
