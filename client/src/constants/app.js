/**
 * Application Constants
 */

// App metadata
export const APP_NAME = 'GreenTrace';
export const APP_TAGLINE = 'Carbon Footprint Tracking';
export const APP_DESCRIPTION = 'Track, analyze, and reduce your company\'s carbon footprint';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'greentrace_auth_token',
  REFRESH_TOKEN: 'greentrace_refresh_token',
  USER: 'greentrace_user',
  THEME: 'greentrace_theme',
  LANGUAGE: 'greentrace_language',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
};

// Industries (array format for forms)
export const INDUSTRIES_ARRAY = [
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'MANUFACTURING', label: 'Manufacturing' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'HOSPITALITY', label: 'Hospitality' },
  { value: 'FINANCE', label: 'Finance & Banking' },
  { value: 'LOGISTICS', label: 'Logistics & Transportation' },
  { value: 'FOOD_BEVERAGE', label: 'Food & Beverage' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'ENERGY', label: 'Energy & Utilities' },
  { value: 'AGRICULTURE', label: 'Agriculture' },
  { value: 'OTHER', label: 'Other' },
];

// Industries (object format for lookups)
export const INDUSTRIES = {
  TECHNOLOGY: 'Technology',
  MANUFACTURING: 'Manufacturing',
  RETAIL: 'Retail',
  HEALTHCARE: 'Healthcare',
  EDUCATION: 'Education',
  HOSPITALITY: 'Hospitality',
  FINANCE: 'Finance & Banking',
  LOGISTICS: 'Logistics & Transportation',
  FOOD_BEVERAGE: 'Food & Beverage',
  CONSTRUCTION: 'Construction',
  ENERGY: 'Energy & Utilities',
  AGRICULTURE: 'Agriculture',
  OTHER: 'Other',
};

// Company sizes
export const COMPANY_SIZES = [
  { value: 'SMALL', label: 'Small (1-50 employees)' },
  { value: 'MEDIUM', label: 'Medium (51-250 employees)' },
  { value: 'LARGE', label: 'Large (251-1000 employees)' },
  { value: 'ENTERPRISE', label: 'Enterprise (1000+ employees)' },
];

// Time periods
export const TIME_PERIODS = {
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  YEAR: 'YEAR',
  ALL_TIME: 'ALL_TIME',
};

// Time period labels
export const TIME_PERIOD_LABELS = {
  [TIME_PERIODS.WEEK]: 'This Week',
  [TIME_PERIODS.MONTH]: 'This Month',
  [TIME_PERIODS.QUARTER]: 'This Quarter',
  [TIME_PERIODS.YEAR]: 'This Year',
  [TIME_PERIODS.ALL_TIME]: 'All Time',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_FULL: 'MMMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: 'yyyy-MM-dd\'T\'HH:mm:ss',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#64748b',
  ACCENT: '#f97316',
  SUCCESS: '#22c55e',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
  SCOPE_1: '#ef4444',
  SCOPE_2: '#f59e0b',
  SCOPE_3: '#3b82f6',
};

// Toast messages duration (ms)
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  INFO: 4000,
  WARNING: 4000,
};

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'text/csv', 'application/vnd.ms-excel'],
  },
};

// Validation patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back!',
  REGISTER: 'Registration successful! Please login.',
  UPDATE: 'Updated successfully!',
  DELETE: 'Deleted successfully!',
  SAVE: 'Saved successfully!',
  CALCULATION: 'Carbon footprint calculated successfully!',
};
