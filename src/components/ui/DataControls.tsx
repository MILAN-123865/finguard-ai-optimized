import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from './Input';
import { Select } from './Select';

export const SearchBar: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder = "Search...", className = '' }) => (
  <div className={`w-full max-w-sm relative ${className}`}>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      leftIcon={<Search size={18} />}
    />
  </div>
);

export const FilterPanel: React.FC<{
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}> = ({ options, value, onChange, className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="p-2.5 rounded-xl bg-white/5 text-[#bac9cc] border border-white/10 shrink-0">
      <Filter size={18} />
    </div>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      className="w-40"
    />
  </div>
);

export const SortDropdown: React.FC<{
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}> = ({ options, value, onChange, className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="p-2.5 rounded-xl bg-white/5 text-[#bac9cc] border border-white/10 shrink-0">
      <ArrowUpDown size={18} />
    </div>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      className="w-40"
    />
  </div>
);
