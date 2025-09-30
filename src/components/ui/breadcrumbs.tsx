import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageType } from '@/types';

interface BreadcrumbItem {
  label: string;
  page?: PageType;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-gray-400 ${className}`}
      aria-label="Navegação estrutural"
    >
      <Home className="w-4 h-4" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 mx-1" />
          {item.isActive ? (
            <span className="text-white font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-1 py-0.5"
              type="button"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

