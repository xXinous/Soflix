import React, { useState } from 'react';
import { Plus, Settings, Heart, User } from 'lucide-react';
import { getDeviceInfo, getUserIP, generateSessionId } from '@/utils/deviceInfo';

interface UserSelectionProps {
  onUserSelect: (userType: 'sofia' | 'admin') => void;
}

export function UserSelection({ onUserSelect }: UserSelectionProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    if (adminPassword === '179598') {
      // Salvar acesso do admin
      const deviceInfo = getDeviceInfo();
      const userIP = await getUserIP();
      const sessionId = generateSessionId();
      
      const currentTime = new Date().toISOString();
      const adminVisits = JSON.parse(localStorage.getItem('soflix_admin_visits') || '[]');
      
      adminVisits.push({
        sessionId,
        timestamp: currentTime,
        type: 'admin_access',
        userIP,
        deviceInfo,
        userAgent: navigator.userAgent,
        location: window.location.href
      });
      
      localStorage.setItem('soflix_admin_visits', JSON.stringify(adminVisits));
      
      onUserSelect('admin');
    } else {
      setError('Senha incorreta');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSofiaSelect = async () => {
    // Salvar acesso da Sofia
    const deviceInfo = getDeviceInfo();
    const userIP = await getUserIP();
    const sessionId = generateSessionId();
    
    const currentTime = new Date().toISOString();
    const sofiaVisits = JSON.parse(localStorage.getItem('soflix_sofia_visits') || '[]');
    
    sofiaVisits.push({
      sessionId,
      timestamp: currentTime,
      type: 'sofia_access',
      userIP,
      deviceInfo,
      userAgent: navigator.userAgent,
      location: window.location.href
    });
    
    localStorage.setItem('soflix_sofia_visits', JSON.stringify(sofiaVisits));

    onUserSelect('sofia');
  };

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
              onClick={handleSofiaSelect}
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
              onClick={() => setShowAdminLogin(true)}
            >
              <div className="relative mb-4">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105" 
                  style={{ background: 'linear-gradient(to bottom right, #4b5563, #1f2937)' }}
                >
                  <Settings className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-300">
                Painel Admin
              </h3>
            </div>

            {/* Add Profile (disabled) */}
            <div className="text-center opacity-50">
              <div className="relative mb-4">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 border-2 border-gray-600 rounded-lg flex items-center justify-center" 
                  style={{ borderStyle: 'dashed' }}
                >
                  <Plus className="w-8 h-8 md:w-12 md:h-12 text-gray-600" />
                </div>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-500">
                Adicionar Perfil
              </h3>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-gray-400 text-sm text-[13px]">
            Selecione um perfil para continuar assistindo nossa história de amor
          </p>
        </div>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-gray-800">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Acesso Administrativo</h2>
                <p className="text-gray-400">Digite a senha para acessar o painel de controle</p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />

                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPassword('');
                      setError('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Entrar
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>Acesso restrito - Apenas Marcelo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}