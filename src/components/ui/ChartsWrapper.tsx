import React from 'react';

export interface ChartsWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  height?: number | string;
  className?: string;
}

export const ChartsWrapper: React.FC<ChartsWrapperProps> = ({ 
  title, 
  description, 
  children, 
  height = 300,
  className = '' 
}) => {
  return (
    <div className={`glass-card rounded-3xl p-6 border border-white/10 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          {description && <p className="text-sm text-[#bac9cc] mt-1">{description}</p>}
        </div>
      )}
      <div 
        className="w-full relative" 
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {children}
      </div>
    </div>
  );
};
