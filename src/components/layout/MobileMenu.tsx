import React from 'react';
import { User } from 'lucide-react';
import { PageType } from '@/types';

interface MobileMenuProps {
  showMobileMenu: boolean;
  currentPage: PageType;
  onPageNavigation: (page: PageType) => void;
  onBannedGenres: () => void;
  onUserChange: () => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  showMobileMenu,
  currentPage,
  onPageNavigation,
  onBannedGenres,
  onUserChange,
  onClose,
}) => {
  if (!showMobileMenu) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
        aria-label="Fechar menu"
      ></div>
      
      {/* Menu */}
      <div className="absolute top-16 right-3 bg-gray-900 rounded-lg border border-gray-700 shadow-xl min-w-[200px] overflow-hidden">
        <div className="py-2">
          {/* Navigation Items */}
          <button 
            onClick={() => onPageNavigation('home')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${currentPage === 'home' ? 'text-white bg-gray-800' : 'text-gray-300'}`}
            type="button"
          >
            <span>Início</span>
          </button>
          
          <button 
            onClick={() => onPageNavigation('series')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${currentPage === 'series' ? 'text-white bg-gray-800' : 'text-gray-300'}`}
            type="button"
          >
            <span>Séries</span>
          </button>
          
          <button 
            onClick={() => onPageNavigation('movies')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${currentPage === 'movies' ? 'text-white bg-gray-800' : 'text-gray-300'}`}
            type="button"
          >
            <span>Filmes</span>
          </button>
          
          <button 
            onClick={() => onPageNavigation('mylist')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${currentPage === 'mylist' ? 'text-white bg-gray-800' : 'text-gray-300'}`}
            type="button"
          >
            <span>Minha Lista</span>
          </button>
          
          <button 
            onClick={onBannedGenres}
            className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors text-gray-300"
            type="button"
          >
            <span>Gêneros Banidos</span>
          </button>
          
          {/* Separator */}
          <div className="border-t border-gray-700 my-2"></div>
          
          {/* User Actions */}
          <button 
            onClick={onUserChange}
            className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors flex items-center space-x-3 text-gray-300"
            type="button"
          >
            <User className="w-4 h-4" />
            <span>Trocar Usuário</span>
          </button>
          
          {/* User Info */}
          <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-700 bg-gray-800/50">
            Logado como Sofia
          </div>
        </div>
      </div>
    </div>
  );
};
