import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height,
  style,
  ...props 
}) => {
  const baseStyles = "animate-pulse bg-white/10";
  
  const variants = {
    rectangular: "rounded-xl",
    circular: "rounded-full",
    text: "rounded-md"
  };

  const inlineStyle = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
    ...style
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={inlineStyle}
      {...props}
    />
  );
};
