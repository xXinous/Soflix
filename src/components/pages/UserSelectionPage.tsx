/**
 * Página de seleção de usuários com integração ao Router
 */

import { useNavigate } from 'react-router-dom';
import { UserSelection } from './UserSelection';
import { UserType } from '@/types';
import { useUser } from '@/contexts/UserContext';

export function UserSelectionPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleUserSelect = (user: UserType) => {
    if (user) {
      // Definir o usuário no contexto
      setCurrentUser(user);
      
      if (user === 'admin') {
        // Navegar para o dashboard do admin
        navigate('/dashboard-adm');
      } else {
        // Navegar para a página inicial (Sofia)
        navigate('/home');
      }
    }
  };

  return <UserSelection onUserSelect={handleUserSelect} />;
}
