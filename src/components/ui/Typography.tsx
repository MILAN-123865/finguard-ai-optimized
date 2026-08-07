import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

/**
 * Main Page Heading (48px / 3rem equivalent, Font Weight: 800, Letter Spacing: -0.02em)
 */
export const PageTitle: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h1',
  id,
}) => (
  <Component
    id={id}
    className={`text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-[-0.02em] leading-tight text-white ${className}`}
  >
    {children}
  </Component>
);

/**
 * Section Heading (32px / 2rem equivalent, Font Weight: 700)
 */
export const SectionTitle: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h2',
  id,
}) => (
  <Component
    id={id}
    className={`text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight leading-snug text-white ${className}`}
  >
    {children}
  </Component>
);

/**
 * Card Heading (22px / 1.375rem equivalent, Font Weight: 700)
 */
export const CardTitle: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h3',
  id,
}) => (
  <Component
    id={id}
    className={`text-lg sm:text-xl md:text-[22px] font-bold leading-snug text-white ${className}`}
  >
    {children}
  </Component>
);

/**
 * Widget Title (18px / 1.125rem equivalent, Font Weight: 600)
 */
export const WidgetTitle: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h4',
  id,
}) => (
  <Component
    id={id}
    className={`text-base sm:text-lg md:text-[18px] font-semibold leading-normal text-white ${className}`}
  >
    {children}
  </Component>
);

/**
 * Body Text (15-16px, Weight: 400-500)
 */
export const BodyText: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'p',
  id,
}) => (
  <Component
    id={id}
    className={`text-sm sm:text-base font-normal leading-relaxed text-[#bac9cc] ${className}`}
  >
    {children}
  </Component>
);

/**
 * Small Label (13px, Weight: 500)
 */
export const SmallLabel: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'span',
  id,
}) => (
  <Component
    id={id}
    className={`text-[13px] font-medium leading-normal text-[#bac9cc] ${className}`}
  >
    {children}
  </Component>
);
