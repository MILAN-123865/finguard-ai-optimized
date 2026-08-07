import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', label, description, error, id, ...props }, ref) => {
    const radioId = id || Math.random().toString(36).substring(7);

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            className="peer appearance-none w-5 h-5 border border-white/20 rounded-full bg-[#0a0d1c] checked:border-[#00daf3] cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#00daf3]/50 focus:ring-offset-2 focus:ring-offset-[#0f1321]"
            {...props}
          />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#00daf3] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <label htmlFor={radioId} className="text-sm font-medium text-white cursor-pointer select-none">
            {label}
          </label>
          {description && <p className="text-xs text-[#bac9cc] mt-0.5">{description}</p>}
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);
Radio.displayName = "Radio";
