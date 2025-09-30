import { PageType, UserType } from '@/types';
import { HeaderUI } from '@/components/ui/header-ui';
import { SearchModal } from '@/components/ui/search-modal';
import { NotificationsPanel } from '@/components/ui/notifications-panel';
import { useState } from 'react';
import { Movie } from '@/types';

interface HeaderProps {
  currentPage: PageType;
  onPageNavigation: (page: PageType) => void;
  onBannedGenres: () => void;
  onToggleMobileMenu: () => void;
  showMobileMenu: boolean;
  onUserChange: () => void;
  currentUser: UserType;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const Header = ({
  currentPage,
  onPageNavigation,
  onBannedGenres,
  onToggleMobileMenu,
  showMobileMenu,
  onUserChange,
  currentUser,
  movies,
  onMovieClick,
}: HeaderProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handlers para as ações do header
  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleNotifications = () => {
    setShowNotifications(true);
  };

  return (
    <>
      <HeaderUI
        currentPage={currentPage}
        onPageNavigation={onPageNavigation}
        onBannedGenres={onBannedGenres}
        onToggleMobileMenu={onToggleMobileMenu}
        showMobileMenu={showMobileMenu}
        onUserChange={onUserChange}
        currentUser={currentUser}
        onSearch={handleSearch}
        onNotifications={handleNotifications}
      />
      
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        movies={movies}
        onMovieClick={onMovieClick}
      />
      
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};
