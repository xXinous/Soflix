import React from 'react';
import { Heart, User } from 'lucide-react';

interface UserSelectionUIProps {
  showAdminLogin: boolean;
  adminPassword: string;
  error: string;
  onSofiaSelect: () => void;
  onAdminClick: () => void;
  onAdminPasswordChange: (password: string) => void;
  onAdminLogin: () => void;
  onBackToProfiles: () => void;
}

export const UserSelectionUI: React.FC<UserSelectionUIProps> = ({
  showAdminLogin,
  adminPassword,
  error,
  onSofiaSelect,
  onAdminClick,
  onAdminPasswordChange,
  onAdminLogin,
  onBackToProfiles,
}) => {
  if (showAdminLogin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-500 mb-4">ADMIN LOGIN</h1>
            <p className="text-gray-300">Digite a senha de administrador</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => onAdminPasswordChange(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              onKeyDown={(e) => e.key === 'Enter' && onAdminLogin()}
            />
            
            {error && (
              <div className="text-red-400 text-sm text-center mb-4">
                {error}
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                onClick={onAdminLogin}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={onBackToProfiles}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-500 mb-4">SOFLIX</h1>
          <p className="text-xl text-gray-300">Quem está assistindo?</p>
        </div>

        {/* User Profiles */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {/* Sofia Profile */}
            <div 
              className="text-center cursor-pointer" 
              onClick={onSofiaSelect}
            >
              <div className="relative mb-4">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105" 
                  style={{ background: 'linear-gradient(to bottom right, #ec4899, #ef4444)' }}
                >
                  <Heart className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-300">
                Sofia
              </h3>
            </div>

            {/* Admin Profile */}
            <div
              className="text-center cursor-pointer"
              onClick={onAdminClick}
            >
              <div className="relative mb-4">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-600 to-gray-800"
                >
                  <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-300">
                Admin
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
