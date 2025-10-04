/**
 * Página do Dashboard Admin com integração ao Router
 */

import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '../features/AdminDashboard';
import { useUser } from '@/contexts/UserContext';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleBack = () => {
    // Limpar usuário e voltar para a tela de perfis
    clearUser();
    navigate('/perfis');
  };

  return <AdminDashboard onBack={handleBack} />;
}