import React from 'react';
import { cn } from '../lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  dark = false,
  className
}) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16 flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {subtitle && (
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-accent/20 bg-accent/5',
            dark ? 'text-accent border-accent/30' : 'text-primary'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl md:text-5xl font-bold tracking-tight',
          dark ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'h-1 w-16 bg-accent mt-4 rounded-full',
          align === 'center' ? 'mx-auto' : 'mr-auto'
        )}
      />
    </div>
  );
};
