import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', label, description, id, ...props }, ref) => {
    const toggleId = id || Math.random().toString(36).substring(7);

    return (
      <div className={`flex items-center justify-between ${className}`}>
        {(label || description) && (
          <div className="flex flex-col mr-4">
            {label && (
              <label htmlFor={toggleId} className="text-sm font-medium text-white cursor-pointer select-none">
                {label}
              </label>
            )}
            {description && <p className="text-xs text-[#bac9cc] mt-0.5">{description}</p>}
          </div>
        )}
        <div className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            id={toggleId}
            ref={ref}
            className="sr-only peer"
            {...props}
          />
          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00daf3]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00daf3]"></div>
        </div>
      </div>
    );
  }
);
Toggle.displayName = "Toggle";
