import React from 'react';
import { ProfileId, getProfileConfig } from '@/constants/profiles';
import { cn } from './utils';

interface ProfileAvatarProps {
  profileId: ProfileId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallback?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24 md:w-32 md:h-32'
};

const initialSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
  xl: 'text-2xl md:text-3xl'
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  profileId,
  size = 'md',
  className = '',
  showFallback = true,
  onClick
}) => {
  const profile = getProfileConfig(profileId);
  const [imageError, setImageError] = React.useState(false);


  const handleImageError = () => {
    console.error(`Erro ao carregar imagem do perfil ${profileId}:`, profile.photo);
    setImageError(true);
  };

  const baseClasses = cn(
    'rounded-lg flex items-center justify-center transition-all duration-300',
    sizeClasses[size],
    onClick && 'cursor-pointer hover:scale-105',
    className
  );

  // Se a imagem falhou ao carregar, mostrar fallback
  if (imageError || !showFallback) {
    return (
      <div
        className={cn(baseClasses)}
        onClick={onClick}
        style={{
          background: `linear-gradient(to bottom right, ${profile.fallbackColors.primary}, ${profile.fallbackColors.secondary})`
        }}
      >
        <span className={cn('text-white font-semibold', initialSizeClasses[size])}>
          {profile.initial}
        </span>
      </div>
    );
  }

  return (
    <img
      src={profile.photo}
      alt={`Foto de perfil de ${profile.name}`}
      className={cn(baseClasses, 'object-cover')}
      onError={handleImageError}
      onClick={onClick}
    />
  );
};

/**
 * Versão simplificada para uso em menus e dropdowns
 */
export const ProfileAvatarSmall: React.FC<Omit<ProfileAvatarProps, 'size'>> = (props) => (
  <ProfileAvatar {...props} size="sm" />
);

/**
 * Versão para seleção de perfil
 */
export const ProfileAvatarLarge: React.FC<Omit<ProfileAvatarProps, 'size'>> = (props) => (
  <ProfileAvatar {...props} size="xl" />
);

