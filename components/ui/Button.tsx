'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// We combine motion.button props with custom button props.
export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none tracking-wide';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark shadow-sm border border-primary',
      secondary: 'bg-secondary text-primary border border-secondary-dark hover:bg-secondary-dark hover:text-primary-dark',
      accent: 'bg-accent text-white hover:bg-accent-light active:bg-accent-dark shadow-sm border border-accent',
      outline: 'bg-transparent text-primary hover:text-white border border-primary hover:bg-primary',
      ghost: 'bg-transparent text-primary hover:bg-secondary-dark/50'
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-semibold',
      md: 'px-6 py-3 text-sm font-semibold',
      lg: 'px-8 py-4 text-base font-semibold'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
