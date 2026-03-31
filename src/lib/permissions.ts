import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

/** All available action-level permission strings */
export const PERMISSIONS = {
  // ── Dashboard ────────────────────────────────────────────────
  VIEW_DASHBOARD:              'view_dashboard',

  // ── Pages ────────────────────────────────────────────────────
  VIEW_PAGES:                  'view_pages',
  UPDATE_PAGES:                'update_pages',
  PUBLISH_PAGES:               'publish_pages',
  MANAGE_PAGE_DRAFTS:          'manage_page_drafts',

  // ── Submissions ───────────────────────────────────────────────
  VIEW_SUBMISSIONS:            'view_submissions',
  VIEW_SUBMISSION_DETAILS:     'view_submission_details',
  UPDATE_SUBMISSIONS_STATUS:   'update_submissions_status',
  DELETE_SUBMISSIONS:          'delete_submissions',

  // ── Blog Posts ────────────────────────────────────────────────
  VIEW_BLOG_POSTS:             'view_blog_posts',
  CREATE_BLOG_POSTS:           'create_blog_posts',
  UPDATE_BLOG_POSTS:           'update_blog_posts',
  PUBLISH_BLOG_POSTS:          'publish_blog_posts',
  DELETE_BLOG_POSTS:           'delete_blog_posts',

  // ── Blog Categories ───────────────────────────────────────────
  VIEW_BLOG_CATEGORIES:        'view_blog_categories',
  CREATE_BLOG_CATEGORIES:      'create_blog_categories',
  UPDATE_BLOG_CATEGORIES:      'update_blog_categories',
  DELETE_BLOG_CATEGORIES:      'delete_blog_categories',

  // ── Projects ──────────────────────────────────────────────────
  VIEW_PROJECTS:               'view_projects',
  CREATE_PROJECTS:             'create_projects',
  UPDATE_PROJECTS:             'update_projects',
  PUBLISH_PROJECTS:            'publish_projects',
  DELETE_PROJECTS:             'delete_projects',

  // ── Users ─────────────────────────────────────────────────────
  VIEW_USERS:                  'view_users',
  CREATE_USERS:                'create_users',
  UPDATE_USERS:                'update_users',
  DELETE_USERS:                'delete_users',

  // ── Roles ─────────────────────────────────────────────────────
  VIEW_ROLES:                  'view_roles',
  CREATE_ROLES:                'create_roles',
  UPDATE_ROLES:                'update_roles',
  DELETE_ROLES:                'delete_roles',

  // ── Super ─────────────────────────────────────────────────────
  FULL_ACCESS:                 'full_access',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Route prefix → minimum required permission.
 * The middleware uses this map for route-level access control.
 * Fine-grained action checks (create/delete/publish) happen inside pages/components.
 */
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  '/admin/pages':           PERMISSIONS.VIEW_PAGES,
  '/admin/submissions':     PERMISSIONS.VIEW_SUBMISSIONS,
  '/admin/blog-posts':      PERMISSIONS.VIEW_BLOG_POSTS,
  '/admin/blog-categories': PERMISSIONS.VIEW_BLOG_CATEGORIES,
  '/admin/projects':        PERMISSIONS.VIEW_PROJECTS,
  '/admin/users':           PERMISSIONS.VIEW_USERS,
  '/admin/roles':           PERMISSIONS.VIEW_ROLES,
};

/** Check whether a user holds a permission (full_access always passes). */
export function hasPermission(userPermissions: string[], required: Permission): boolean {
  return (
    userPermissions.includes(PERMISSIONS.FULL_ACCESS) ||
    userPermissions.includes(required)
  );
}

/** Alias for use in Server Components. */
export const canAccess = hasPermission;

/**
 * Extract the admin token payload from the x-admin-user header that middleware injects.
 * Returns null if missing or unparseable.
 */
export function getUserFromHeader(headerStore: ReadonlyHeaders): import('@/lib/auth').AdminTokenPayload | null {
  try {
    const raw = headerStore.get('x-admin-user');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
