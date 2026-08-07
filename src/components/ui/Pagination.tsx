import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className={`flex items-center justify-center gap-1.5 ${className}`} aria-label="Pagination">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </Button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-[#bac9cc]">
            <MoreHorizontal size={18} />
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? 'primary' : 'ghost'}
            className={currentPage !== page ? 'text-[#bac9cc] hover:text-white' : ''}
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? 'page' : undefined}
            style={{ minWidth: '2.5rem', padding: '0 0.5rem' }}
          >
            {page}
          </Button>
        )
      ))}

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </Button>
    </nav>
  );
};
