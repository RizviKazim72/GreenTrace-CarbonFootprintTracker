/**
 * Format date to display format
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const map = {
    'yyyy': d.getFullYear(),
    'yy': String(d.getFullYear()).slice(-2),
    'MMMM': monthsFull[d.getMonth()],
    'MMM': months[d.getMonth()],
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'dd': String(d.getDate()).padStart(2, '0'),
    'd': d.getDate(),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'ss': String(d.getSeconds()).padStart(2, '0'),
  };
  
  let result = format;
  Object.entries(map).forEach(([key, value]) => {
    result = result.replace(key, value);
  });
  
  return result;
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string|number} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
};

/**
 * Check if date is today
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

/**
 * Check if date is in current week
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in current week
 */
export const isThisWeek = (date) => {
  const d = new Date(date);
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return d >= weekStart && d <= weekEnd;
};

/**
 * Check if date is in current month
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in current month
 */
export const isThisMonth = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};

/**
 * Get start and end dates for time period
 * @param {string} period - Time period ('WEEK', 'MONTH', 'QUARTER', 'YEAR')
 * @returns {Object} Object with startDate and endDate
 */
export const getDateRange = (period) => {
  const today = new Date();
  let startDate, endDate;
  
  switch (period) {
    case 'WEEK':
      startDate = new Date(today.setDate(today.getDate() - today.getDay()));
      endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      break;
    case 'MONTH':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case 'QUARTER':
      const quarter = Math.floor(today.getMonth() / 3);
      startDate = new Date(today.getFullYear(), quarter * 3, 1);
      endDate = new Date(today.getFullYear(), quarter * 3 + 3, 0);
      break;
    case 'YEAR':
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
      break;
    default:
      startDate = new Date(0);
      endDate = new Date();
  }
  
  return { startDate, endDate };
};

/**
 * Add days to date
 * @param {Date|string|number} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to date
 * @param {Date|string|number} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} New date
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};
