/**
 * Format number with commas and decimals
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format number as currency
 * @param {number} value - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined || isNaN(value)) return `${currency} 0`;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} value - Number to format
 * @returns {string} Formatted number with suffix
 */
export const formatCompactNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

/**
 * Format percentage
 * @param {number} value - Value to format (0-100)
 * @param {number} decimals - Decimal places (default: 1)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Calculate percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Clamp a number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round to specified decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Decimal places
 * @returns {number} Rounded value
 */
export const roundTo = (value, decimals = 2) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculate average of array of numbers
 * @param {number[]} values - Array of numbers
 * @returns {number} Average value
 */
export const average = (values) => {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

/**
 * Calculate sum of array of numbers
 * @param {number[]} values - Array of numbers
 * @returns {number} Sum
 */
export const sum = (values) => {
  if (!values || values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0);
};
