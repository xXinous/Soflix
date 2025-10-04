import { updateUserType } from '@/utils/cloudflareAnalytics';
import { UserSelectionProps } from '@/types';
import { ProfileAvatarLarge } from '@/components/ui/ProfileAvatar';
import { getAllProfiles } from '@/constants/profiles';

export function UserSelection({ onUserSelect }: UserSelectionProps) {
  const handleProfileSelect = async (profileId: 'sofia' | 'marcelo') => {
    try {
      // Atualizar analytics
      await updateUserType(profileId);
      onUserSelect(profileId);
    } catch (error) {
      console.error(`Erro ao registrar acesso do ${profileId}:`, error);
      // Continuar mesmo com erro para não bloquear o usuário
      onUserSelect(profileId);
    }
  };

  const profiles = getAllProfiles();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-600 mb-2">SoFlix</h1>
          <p className="text-gray-400">Quem está assistindo?</p>
        </div>

        {/* Perfis */}
        <div className="space-y-6">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleProfileSelect(profile.id as 'sofia' | 'marcelo')}
              className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <ProfileAvatarLarge 
                  profileId={profile.id as 'sofia' | 'marcelo'}
                  className="w-16 h-16"
                />
                <div className="text-left">
                  <h3 className="text-xl font-semibold group-hover:text-white">
                    {profile.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {profile.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Ambos os perfis levam para a mesma experiência
          </p>
        </div>
      </div>
    </div>
  );
}