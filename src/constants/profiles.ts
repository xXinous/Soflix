/**
 * Configuração dos perfis de usuário
 * Para adicionar uma nova foto de perfil, simplesmente:
 * 1. Adicione a imagem em src/assets/profiles/
 * 2. Atualize o objeto PROFILE_CONFIG abaixo
 * 3. A imagem será automaticamente carregada em todos os componentes
 */

// Importações das imagens de perfil
import sofiaPhoto from '@/assets/profiles/sofia.jpg';
import marceloPhoto from '@/assets/profiles/marcelo.jpg';


// Configuração dos perfis - FÁCIL DE MANTER!
export const PROFILE_CONFIG = {
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    description: 'Perfil principal',
    // Para trocar a foto, simplesmente substitua 'placeholder' pelo nome do arquivo
    // Exemplo: photo: sofiaPhoto (se o arquivo for sofiaPhoto.png)
    photo: sofiaPhoto,
    // Cores de fallback caso a imagem não carregue
    fallbackColors: {
      primary: '#ec4899', // pink-500
      secondary: '#ef4444' // red-500
    },
    // Inicial para mostrar caso não tenha foto
    initial: 'S'
  },
  marcelo: {
    id: 'marcelo',
    name: 'Marcelo',
    description: 'Perfil secundário',
    // Para trocar a foto, simplesmente substitua 'placeholder' pelo nome do arquivo
    // Exemplo: photo: marceloPhoto (se o arquivo for marceloPhoto.png)
    photo: marceloPhoto,
    // Cores de fallback caso a imagem não carregue
    fallbackColors: {
      primary: '#3b82f6', // blue-500
      secondary: '#06b6d4' // cyan-500
    },
    // Inicial para mostrar caso não tenha foto
    initial: 'M'
  }
} as const;

// Tipos derivados da configuração
export type ProfileId = keyof typeof PROFILE_CONFIG;
export type Profile = typeof PROFILE_CONFIG[ProfileId];

/**
 * Função utilitária para obter configuração de um perfil
 */
export function getProfileConfig(profileId: ProfileId): Profile {
  return PROFILE_CONFIG[profileId];
}

/**
 * Função utilitária para obter todos os perfis
 */
export function getAllProfiles(): Profile[] {
  return Object.values(PROFILE_CONFIG);
}

/**
 * Função utilitária para verificar se um ID de perfil é válido
 */
export function isValidProfileId(profileId: string): profileId is ProfileId {
  return profileId in PROFILE_CONFIG;
}
