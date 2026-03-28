/** All available permission strings in the system */
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_PAGES: 'manage_pages',
  MANAGE_PAGE_DRAFTS: 'manage_page_drafts',
  VIEW_SUBMISSIONS: 'view_submissions',
  VIEW_SUBMISSION_DETAILS: 'view_submission_details',
  MANAGE_BLOG_POSTS: 'manage_blog_posts',
  MANAGE_BLOG_CATEGORIES: 'manage_blog_categories',
  MANAGE_PROJECTS: 'manage_projects',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  FULL_ACCESS: 'full_access',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Route prefix → required permission.
 * The middleware walks this map to find whether the current user
 * has permission to access the requested path.
 */
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  '/admin/pages': PERMISSIONS.MANAGE_PAGES,
  '/admin/submissions': PERMISSIONS.VIEW_SUBMISSIONS,
  '/admin/blog-posts': PERMISSIONS.MANAGE_BLOG_POSTS,
  '/admin/blog-categories': PERMISSIONS.MANAGE_BLOG_CATEGORIES,
  '/admin/projects': PERMISSIONS.MANAGE_PROJECTS,
  '/admin/users': PERMISSIONS.MANAGE_USERS,
  '/admin/roles': PERMISSIONS.MANAGE_ROLES,
};

/**
 * Check whether a user has a specific permission.
 * Users with `full_access` always pass.
 */
export function hasPermission(userPermissions: string[], required: Permission): boolean {
  return (
    userPermissions.includes(PERMISSIONS.FULL_ACCESS) ||
    userPermissions.includes(required)
  );
}

/** Helper for use in Server Components / pages */
export function canAccess(userPermissions: string[], required: Permission): boolean {
  return hasPermission(userPermissions, required);
}
