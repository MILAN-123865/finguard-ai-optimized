import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, description, error, id, ...props }, ref) => {
    const checkboxId = id || Math.random().toString(36).substring(7);

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className="peer appearance-none w-5 h-5 border border-white/20 rounded-md bg-[#0a0d1c] checked:bg-[#00daf3] checked:border-[#00daf3] cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#00daf3]/50 focus:ring-offset-2 focus:ring-offset-[#0f1321]"
            {...props}
          />
          <Check size={14} className="absolute text-[#00363d] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <label htmlFor={checkboxId} className="text-sm font-medium text-white cursor-pointer select-none">
            {label}
          </label>
          {description && <p className="text-xs text-[#bac9cc] mt-0.5">{description}</p>}
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
