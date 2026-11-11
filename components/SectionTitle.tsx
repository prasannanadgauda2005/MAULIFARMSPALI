import React from 'react';
import { cn } from '../lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
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
            'text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] mb-3 block',
            dark ? 'text-amber-300/90' : 'text-amber-800/90'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15]',
          dark ? 'text-white' : 'text-primary'
        )}
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-sm md:text-base font-light max-w-2xl leading-relaxed',
            dark ? 'text-white/70' : 'text-dark/70'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
