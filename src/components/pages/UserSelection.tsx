import { useState } from 'react';
import { UserSelectionUI } from '@/components/ui/user-selection-ui';
import { getDeviceInfoAsync, getUserIP, generateSessionId } from '@/utils/deviceInfo';
import { verifyAdminPassword } from '@/utils/auth';

interface UserSelectionProps {
  onUserSelect: (userType: 'sofia' | 'admin') => void;
}

export function UserSelection({ onUserSelect }: UserSelectionProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    try {
      // Verificar senha usando hash seguro
      if (verifyAdminPassword(adminPassword)) {
        // Salvar acesso do admin
        const deviceInfo = await getDeviceInfoAsync();
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
    } catch (error) {
      console.error('Erro na autenticação:', error);
      setError('Erro interno. Tente novamente.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSofiaSelect = async () => {
    // Salvar acesso da Sofia
    const deviceInfo = await getDeviceInfoAsync();
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
    <UserSelectionUI
      showAdminLogin={showAdminLogin}
      adminPassword={adminPassword}
      error={error}
      onSofiaSelect={handleSofiaSelect}
      onAdminClick={() => setShowAdminLogin(true)}
      onAdminPasswordChange={setAdminPassword}
      onAdminLogin={handleAdminLogin}
      onBackToProfiles={() => {
        setShowAdminLogin(false);
        setAdminPassword('');
        setError('');
      }}
    />
  );
}