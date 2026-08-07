import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onSort?: (key: string) => void;
  className?: string;
}

export function Table<T>({ data, columns, sortConfig, onSort, className = '' }: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0d1c] ${className}`}>
      <table className="w-full text-sm text-left">
        <thead className="bg-white/5 text-[#bac9cc] text-xs uppercase font-bold border-b border-white/10">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                className={`px-6 py-4 ${col.sortable ? 'cursor-pointer hover:text-white transition-colors select-none' : ''}`}
                onClick={() => col.sortable && onSort && onSort(col.accessorKey as string)}
              >
                <div className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    <span className="inline-flex">
                      {sortConfig?.key === col.accessorKey ? (
                        sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} className="opacity-30" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-[#bac9cc]">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {col.cell ? col.cell(row) : String((row as any)[col.accessorKey] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
