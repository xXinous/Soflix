import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { UserType } from '@/types';
import { ProfileAvatarSmall } from '@/components/ui/ProfileAvatar';

interface ProfileDropdownProps {
  onUserChange: () => void;
  currentUser: UserType;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  onUserChange,
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserChange = () => {
    onUserChange();
    setIsOpen(false);
  };

  const getUserDisplayName = () => {
    switch (currentUser) {
      case 'sofia':
        return 'Sofia';
      case 'marcelo':
        return 'Marcelo';
      case 'admin':
        return 'Admin';
      default:
        return 'Usuário';
    }
  };

  const getUserInitial = () => {
    switch (currentUser) {
      case 'sofia':
        return 'S';
      case 'marcelo':
        return 'M';
      case 'admin':
        return 'A';
      default:
        return 'U';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do perfil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg px-2 py-1 transition-colors"
        type="button"
        aria-label="Menu do perfil"
      >
        <ProfileAvatarSmall 
          profileId={currentUser as 'sofia' | 'marcelo'}
          className="w-8 h-8"
        />
        <ChevronDown 
          className={`w-4 h-4 text-gray-300 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-900 rounded-lg border border-gray-700 shadow-xl min-w-[200px] overflow-hidden z-50">
          <div className="py-2">
            {/* Informações do usuário atual */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <ProfileAvatarSmall 
                  profileId={currentUser as 'sofia' | 'marcelo'}
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-white font-medium">{getUserDisplayName()}</p>
                  <p className="text-gray-400 text-sm">Usuário atual</p>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="py-1">
              <button
                onClick={handleUserChange}
                className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors flex items-center space-x-3 text-gray-300"
                type="button"
              >
                <User className="w-4 h-4" />
                <span>Trocar Usuário</span>
              </button>
            </div>

            {/* Informações adicionais */}
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-700 bg-gray-800/50">
              <p>Logado como {getUserDisplayName()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
