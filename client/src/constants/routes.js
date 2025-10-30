/**
 * Application Routes Configuration
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PUBLIC_LEADERBOARD: '/leaderboard/public',
  ABOUT: '/about',
  
  // Protected Routes - Company
  DASHBOARD: '/dashboard',
  CALCULATOR: '/calculator',
  PROFILE: '/profile',
  REPORTS: '/reports',
  COMPARISON: '/comparison',
  LEADERBOARD: '/leaderboard',
  POINTS_HISTORY: '/points/history',
  SETTINGS: '/settings',
  
  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    COMPANIES: '/admin/companies',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
};

// Route Guards
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.PUBLIC_LEADERBOARD,
  ROUTES.ABOUT,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.CALCULATOR,
  ROUTES.PROFILE,
  ROUTES.REPORTS,
  ROUTES.COMPARISON,
  ROUTES.LEADERBOARD,
  ROUTES.POINTS_HISTORY,
  ROUTES.SETTINGS,
];

export const ADMIN_ROUTES = Object.values(ROUTES.ADMIN);
