import React, { useState, useRef, useEffect, forwardRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  options: (SelectOption | string)[];
  placeholder?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'cyber' | 'glass' | 'minimal';
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      error,
      helperText,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      options,
      placeholder = 'Select an option',
      disabled = false,
      leftIcon,
      className = '',
      buttonClassName = '',
      dropdownClassName = '',
      size = 'md',
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const normalizedOptions: SelectOption[] = options.map((opt) =>
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const [internalValue, setInternalValue] = useState<string>(
      defaultValue || (normalizedOptions[0]?.value ?? '')
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState<{ top: number; left: number; width: number; placeAbove: boolean }>({
      top: 0,
      left: 0,
      width: 0,
      placeAbove: false,
    });

    const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue);

    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const placeAbove = spaceBelow < 220 && rect.top > 220;

        setCoords({
          top: placeAbove ? rect.top + window.scrollY - 6 : rect.bottom + window.scrollY + 6,
          left: rect.left + window.scrollX,
          width: Math.max(rect.width, 140),
          placeAbove,
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
      }
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (!isControlled) {
        setInternalValue(option.value);
      }

      if (onValueChange) {
        onValueChange(option.value);
      }

      if (onChange) {
        onChange({
          target: {
            value: option.value,
            name,
          },
        });
      }

      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(normalizedOptions.length - 1);
        } else {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (activeIndex >= 0 && activeIndex < normalizedOptions.length) {
          handleSelect(normalizedOptions[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'Tab') {
        setIsOpen(false);
      }
    };

    const sizeClasses = {
      sm: 'py-1.5 px-3 text-xs',
      md: 'py-2.5 px-3.5 text-xs sm:text-sm',
      lg: 'py-3 px-4 text-sm',
    }[size];

    return (
      <div className={`relative inline-block ${className}`}>
        {label && (
          <label htmlFor={selectId} className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}

        <button
          id={selectId}
          ref={(node) => {
            triggerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={label || placeholder}
          className={`w-full flex items-center justify-between gap-2.5 rounded-[12px] border font-medium transition-all duration-200 cursor-pointer focus:outline-none ${sizeClasses} ${
            error
              ? 'border-[#EF4444] bg-red-50 text-[#EF4444]'
              : isOpen
              ? 'border-[#11875D] bg-[#DDF2EA] text-[#111827]'
              : 'border-[#E4E7E5] bg-[#F8FAFC] hover:bg-white text-[#111827]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${buttonClassName}`}
        >
          <div className="flex items-center gap-2 truncate">
            {leftIcon && <span className="text-[#11875D] shrink-0">{leftIcon}</span>}
            {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
            <span className="truncate font-semibold">
              {selectedOption ? selectedOption.label : <span className="text-[#64748B]">{placeholder}</span>}
            </span>
          </div>

          <ChevronDown
            size={16}
            className={`text-[#64748B] transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-[#11875D]' : 'rotate-0'
            }`}
          />
        </button>

        {error && <p className="mt-1.5 text-xs text-[#EF4444] font-medium">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-[#64748B]">{helperText}</p>}

        {typeof window !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: coords.placeAbove ? 6 : -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: coords.placeAbove ? 6 : -6, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: `${coords.top}px`,
                    left: `${coords.left}px`,
                    width: `${coords.width}px`,
                    zIndex: 9999,
                    transform: coords.placeAbove ? 'translateY(-100%)' : 'none',
                  }}
                  className={`bg-white border border-[#E4E7E5] rounded-[16px] shadow-lg p-1.5 overflow-hidden flex flex-col gap-1 text-[#111827] max-h-[260px] overflow-y-auto ${dropdownClassName}`}
                  role="listbox"
                  tabIndex={-1}
                >
                  {normalizedOptions.map((opt, idx) => {
                    const isSelected = opt.value === currentValue;
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={opt.disabled}
                        onClick={() => handleSelect(opt)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs font-bold transition-colors cursor-pointer text-left ${
                          opt.disabled
                            ? 'opacity-40 cursor-not-allowed text-[#64748B]'
                            : isSelected
                            ? 'bg-[#DDF2EA] text-[#11875D]'
                            : isActive
                            ? 'bg-[#F8FAFC] text-[#11875D]'
                            : 'text-[#111827] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                          <span className="truncate">{opt.label}</span>
                        </div>
                        {isSelected && <Check size={14} className="text-[#11875D] shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    );
  }
);

Select.displayName = 'Select';
