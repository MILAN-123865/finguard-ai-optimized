import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref">, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold font-sans rounded-[16px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7F8F5] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      primary: "bg-[#11875D] text-white hover:bg-[#0e704d] shadow-2xs focus:ring-[#11875D]",
      secondary: "bg-[#DDF2EA] text-[#11875D] hover:bg-[#c9eadf] focus:ring-[#11875D]",
      outline: "border border-[#E4E7E5] bg-white text-[#111827] hover:bg-[#F8FAFC] focus:ring-[#E4E7E5]",
      ghost: "bg-transparent text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC] focus:ring-[#E4E7E5]",
      destructive: "bg-[#EF4444] text-white hover:bg-red-600 shadow-2xs focus:ring-red-500",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-7 text-base",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
