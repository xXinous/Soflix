import { PageType, UserType } from '@/types';
import { HeaderUI } from '@/components/ui/header-ui';

interface HeaderProps {
  currentPage: PageType;
  onPageNavigation: (page: PageType) => void;
  onBannedGenres: () => void;
  onToggleMobileMenu: () => void;
  showMobileMenu: boolean;
  onUserChange: () => void;
  currentUser: UserType;
}

export const Header = ({
  currentPage,
  onPageNavigation,
  onBannedGenres,
  onToggleMobileMenu,
  showMobileMenu,
  onUserChange,
  currentUser,
}: HeaderProps) => {
  // Handlers para as ações do header
  const handleSearch = () => {
    console.log('Buscar');
    // TODO: Implementar lógica de busca
  };

  const handleNotifications = () => {
    console.log('Notificações');
    // TODO: Implementar lógica de notificações
  };

  return (
    <HeaderUI
      currentPage={currentPage}
      onPageNavigation={onPageNavigation}
      onBannedGenres={onBannedGenres}
      onToggleMobileMenu={onToggleMobileMenu}
      onUserChange={onUserChange}
      currentUser={currentUser}
      onSearch={handleSearch}
      onNotifications={handleNotifications}
    />
  );
};
