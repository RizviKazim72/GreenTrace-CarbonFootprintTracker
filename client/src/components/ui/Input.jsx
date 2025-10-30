import clsx from 'clsx';
import { forwardRef } from 'react';

/**
 * Modern Input Component
 * Types: text, email, password, number, etc.
 */
const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  containerClassName,
  ...props
}, ref) => {
  const baseStyles = 'w-full px-4 py-2.5 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:cursor-not-allowed';

  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-secondary-300 hover:border-secondary-400';

  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-secondary-900">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={clsx(
            baseStyles,
            stateStyles,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-xs text-secondary-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
