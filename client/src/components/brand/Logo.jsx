import { memo } from 'react';
import clsx from 'clsx';

const Logo = memo(({ 
  className, 
  size = 40, 
  withText = true, 
  variant = 'primary' 
}) => {
  const iconSize = size;
  const textSize = size * 0.6;

  const colorClasses = {
    primary: 'text-primary-600',
    white: 'text-white',
    dark: 'text-secondary-900'
  };

  const textColorClasses = {
    primary: 'text-secondary-900',
    white: 'text-white',
    dark: 'text-secondary-900'
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Logo Icon - Custom Leaf with Trace */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('transition-transform duration-300 hover:scale-110', colorClasses[variant])}
      >
        {/* Outer Circle */}
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          className="fill-current opacity-10"
        />
        
        {/* Leaf Shape */}
        <path
          d="M20 8C20 8 12 12 12 20C12 26 16 30 20 32C24 30 28 26 28 20C28 12 20 8 20 8Z"
          className="fill-current"
          fillOpacity="0.9"
        />
        
        {/* Leaf Vein */}
        <path
          d="M20 10L20 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-30"
        />
        
        {/* Left Vein Branch */}
        <path
          d="M20 15L15 18"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-30"
        />
        
        {/* Right Vein Branch */}
        <path
          d="M20 15L25 18"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-30"
        />
        
        {/* Bottom Left Vein */}
        <path
          d="M20 22L16 24"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-30"
        />
        
        {/* Bottom Right Vein */}
        <path
          d="M20 22L24 24"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-30"
        />
        
        {/* Trace Circle - Top Right */}
        <circle
          cx="30"
          cy="10"
          r="3"
          className="fill-current"
          opacity="0.8"
        />
        
        {/* Trace Circle - Small */}
        <circle
          cx="34"
          cy="14"
          r="1.5"
          className="fill-current"
          opacity="0.6"
        />
      </svg>

      {/* Logo Text */}
      {withText && (
        <div className="flex flex-col leading-none">
          <span 
            className={clsx(
              'font-bold tracking-tight',
              textColorClasses[variant]
            )}
            style={{ fontSize: `${textSize}px` }}
          >
            GreenTrace
          </span>
          <span 
            className={clsx(
              'text-xs tracking-wider uppercase',
              variant === 'white' ? 'text-white/70' : 'text-secondary-500'
            )}
            style={{ fontSize: `${textSize * 0.35}px` }}
          >
            Carbon Footprint
          </span>
        </div>
      )}
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;