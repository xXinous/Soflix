import { updateUserType } from '@/utils/cloudflareAnalytics';
import { UserSelectionProps } from '@/types';

export function UserSelection({ onUserSelect }: UserSelectionProps) {
  const handleSofiaSelect = async () => {
    try {
      // Atualizar analytics
      await updateUserType('sofia');
      onUserSelect('sofia');
    } catch (error) {
      console.error('Erro ao registrar acesso da Sofia:', error);
      // Continuar mesmo com erro para não bloquear o usuário
      onUserSelect('sofia');
    }
  };

  const handleMarceloSelect = async () => {
    try {
      // Atualizar analytics
      await updateUserType('marcelo');
      onUserSelect('marcelo');
    } catch (error) {
      console.error('Erro ao registrar acesso do Marcelo:', error);
      // Continuar mesmo com erro para não bloquear o usuário
      onUserSelect('marcelo');
    }
  };

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
          {/* Perfil Sofia */}
          <button
            onClick={handleSofiaSelect}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold">
                S
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold group-hover:text-white">Sofia</h3>
                <p className="text-gray-400 text-sm">Perfil principal</p>
              </div>
            </div>
          </button>

          {/* Perfil Marcelo */}
          <button
            onClick={handleMarceloSelect}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-2xl font-bold">
                M
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold group-hover:text-white">Marcelo</h3>
                <p className="text-gray-400 text-sm">Perfil secundário</p>
              </div>
            </div>
          </button>
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