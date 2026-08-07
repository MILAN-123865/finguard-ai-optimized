import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans transition-colors";
  
  const variants = {
    default: "bg-[#F8FAFC] text-[#111827] border border-[#E4E7E5]",
    success: "bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30",
    warning: "bg-amber-50 text-[#F59E0B] border border-amber-200",
    error: "bg-red-50 text-[#EF4444] border border-red-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    outline: "text-[#111827] border border-[#E4E7E5]"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
