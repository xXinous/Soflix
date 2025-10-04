import React from 'react';
import { Search, Bell, Heart, ChevronDown, ArrowLeft } from 'lucide-react';
import { PageType, UserType } from '@/types';
import { ProfileDropdown } from '@/components/layout/ProfileDropdown';

interface HeaderUIProps {
  currentPage: PageType;
  onPageNavigation: (page: PageType) => void;
  onBannedGenres: () => void;
  onToggleMobileMenu: () => void;
  onUserChange: () => void;
  currentUser: UserType;
  onSearch: () => void;
  onNotifications: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
  onLogoClick?: () => void;
}

export const HeaderUI: React.FC<HeaderUIProps> = ({
  currentPage,
  onPageNavigation,
  onBannedGenres,
  onToggleMobileMenu,
  onUserChange,
  currentUser,
  onSearch,
  onNotifications,
  onBack,
  canGoBack,
  onLogoClick,
}) => {
  return (
    <header className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent relative z-50">
      <div className="flex items-center space-x-3 sm:space-x-6">
        {canGoBack && onBack && (
          <button 
            onClick={onBack}
            className="w-6 h-6 sm:w-8 sm:h-8 hover:text-gray-300 transition-colors flex items-center justify-center"
            type="button"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-full h-full" />
          </button>
        )}
        <button 
          onClick={onLogoClick || (() => onPageNavigation('home'))}
          className="text-xl sm:text-2xl font-bold text-red-500 hover:text-red-400 transition-colors"
          type="button"
        >
          SOFLIX
        </button>
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <button 
            onClick={() => onPageNavigation('home')}
            className={`hover:text-gray-300 transition-colors text-sm lg:text-base ${currentPage === 'home' ? 'text-white' : 'text-gray-400'}`}
            type="button"
          >
            Início
          </button>
          <button 
            onClick={() => onPageNavigation('series')}
            className={`hover:text-gray-300 transition-colors text-sm lg:text-base ${currentPage === 'series' ? 'text-white' : 'text-gray-400'}`}
            type="button"
          >
            Séries
          </button>
          <button 
            onClick={() => onPageNavigation('movies')}
            className={`hover:text-gray-300 transition-colors text-sm lg:text-base ${currentPage === 'movies' ? 'text-white' : 'text-gray-400'}`}
            type="button"
          >
            Filmes
          </button>
          <button 
            onClick={() => onPageNavigation('mylist')}
            className={`hover:text-gray-300 transition-colors text-sm lg:text-base ${currentPage === 'mylist' ? 'text-white' : 'text-gray-400'}`}
            type="button"
          >
            Minha Lista
          </button>
          <button 
            onClick={onBannedGenres}
            className="hover:text-gray-300 flex items-center space-x-1 text-gray-400 text-sm lg:text-base"
            type="button"
          >
            <span className="hidden lg:inline">Gêneros Banidos</span>
            <span className="lg:hidden">Banidos</span>
            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </nav>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button 
          onClick={onSearch}
          className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-300 cursor-pointer" 
          type="button" 
          aria-label="Buscar"
        >
          <Search className="w-full h-full" />
        </button>
        <button 
          onClick={onNotifications}
          className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-300 cursor-pointer" 
          type="button" 
          aria-label="Notificações"
        >
          <Bell className="w-full h-full" />
        </button>
        <button
          onClick={onToggleMobileMenu}
          className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors md:hidden relative"
          title="Menu"
          type="button"
        >
          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        <div className="hidden md:flex">
          <ProfileDropdown 
            onUserChange={onUserChange}
            currentUser={currentUser}
          />
        </div>
      </div>
    </header>
  );
};
