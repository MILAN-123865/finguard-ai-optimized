import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, leftIcon, rightIcon, helperText, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-[#F8FAFC] border ${error ? 'border-[#EF4444]' : 'border-[#E4E7E5]'} rounded-[16px] py-3 text-sm text-[#111827] placeholder-[#64748B] focus:border-[#11875D] focus:outline-none transition-colors ${leftIcon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-[#EF4444] font-medium">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-[#64748B]">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
