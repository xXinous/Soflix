import { useState } from 'react';
import { UserSelectionUI } from '@/components/ui/user-selection-ui';
import { getDeviceInfo, getUserIP, generateSessionId } from '@/utils/deviceInfo';
import { verifyAdminPassword, createAdminSession, logLoginAttempt } from '@/utils/auth';
import { storeVisit } from '@/utils/secureStorage';
import { UserSelectionProps } from '@/types';

export function UserSelection({ onUserSelect }: UserSelectionProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    try {
      const deviceInfo = getDeviceInfo();
      const userIP = await getUserIP();
      const userAgent = navigator.userAgent;
      const timestamp = new Date().toISOString();
      
      // Verificar senha usando hash seguro
      const isValidPassword = await verifyAdminPassword(adminPassword);
      
      // Registrar tentativa de login
      await logLoginAttempt(isValidPassword, userIP, userAgent, timestamp);
      
      if (isValidPassword) {
        // Criar sessão segura
        createAdminSession(userIP, userAgent);
        
        // Salvar acesso do admin de forma segura
        const sessionId = generateSessionId();
        await storeVisit({
          sessionId,
          timestamp,
          type: 'admin_access',
          userIP,
          deviceInfo,
          userAgent,
          location: window.location.href
        });
        
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
    try {
      // Salvar acesso da Sofia de forma segura
      const deviceInfo = getDeviceInfo();
      const userIP = await getUserIP();
      const sessionId = generateSessionId();
      const timestamp = new Date().toISOString();
      
      await storeVisit({
        sessionId,
        timestamp,
        type: 'sofia_access',
        userIP,
        deviceInfo,
        userAgent: navigator.userAgent,
        location: window.location.href
      });
      
      onUserSelect('sofia');
    } catch (error) {
      console.error('Erro ao salvar acesso da Sofia:', error);
      // Continuar mesmo com erro para não bloquear o usuário
      onUserSelect('sofia');
    }
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