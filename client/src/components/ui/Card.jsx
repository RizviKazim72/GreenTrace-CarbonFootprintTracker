import clsx from 'clsx';

/**
 * Card Component - Container for content sections
 */
const Card = ({ children, className, padding = 'default', hover = false }) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-secondary-200 shadow-sm',
        paddingStyles[padding],
        hover && 'transition-all duration-200 hover:shadow-md hover:border-secondary-300',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Card Header
 */
Card.Header = ({ children, className }) => (
  <div className={clsx('mb-4 pb-4 border-b border-secondary-200', className)}>
    {children}
  </div>
);

/**
 * Card Title
 */
Card.Title = ({ children, className }) => (
  <h3 className={clsx('text-xl font-semibold text-secondary-900', className)}>
    {children}
  </h3>
);

/**
 * Card Description
 */
Card.Description = ({ children, className }) => (
  <p className={clsx('text-sm text-secondary-600 mt-1', className)}>
    {children}
  </p>
);

/**
 * Card Body
 */
Card.Body = ({ children, className }) => (
  <div className={className}>{children}</div>
);

/**
 * Card Footer
 */
Card.Footer = ({ children, className }) => (
  <div className={clsx('mt-4 pt-4 border-t border-secondary-200', className)}>
    {children}
  </div>
);

export default Card;
