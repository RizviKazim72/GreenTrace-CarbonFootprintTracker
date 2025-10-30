/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const pattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return pattern.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  const pattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  return pattern.test(url);
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if not empty
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if in range
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {boolean} True if valid
 */
export const isValidFileSize = (file, maxSize) => {
  if (!file) return false;
  return file.size <= maxSize;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {boolean} True if valid
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Sanitize string (remove HTML tags)
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
};

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result with isValid and errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];
    const fieldErrors = [];
    
    // Required validation
    if (rule.required && !isRequired(value)) {
      fieldErrors.push(`${rule.label || field} is required`);
    }
    
    // Email validation
    if (rule.email && value && !isValidEmail(value)) {
      fieldErrors.push(`${rule.label || field} must be a valid email`);
    }
    
    // Min length validation
    if (rule.minLength && value && value.length < rule.minLength) {
      fieldErrors.push(`${rule.label || field} must be at least ${rule.minLength} characters`);
    }
    
    // Max length validation
    if (rule.maxLength && value && value.length > rule.maxLength) {
      fieldErrors.push(`${rule.label || field} must be at most ${rule.maxLength} characters`);
    }
    
    // Min value validation
    if (rule.min !== undefined && value && Number(value) < rule.min) {
      fieldErrors.push(`${rule.label || field} must be at least ${rule.min}`);
    }
    
    // Max value validation
    if (rule.max !== undefined && value && Number(value) > rule.max) {
      fieldErrors.push(`${rule.label || field} must be at most ${rule.max}`);
    }
    
    // Custom validation
    if (rule.custom && value) {
      const customResult = rule.custom(value, data);
      if (customResult !== true) {
        fieldErrors.push(customResult);
      }
    }
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};
