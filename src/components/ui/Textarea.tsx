import React, { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || Math.random().toString(36).substring(7);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-bold text-[#bac9cc] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full bg-[#0a0d1c] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#00daf3] focus:outline-none transition-colors resize-y min-h-[100px]`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-[#bac9cc]">{helperText}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
