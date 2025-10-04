/**
 * Contexto para gerenciamento do usuário atual
 * Permite compartilhar o estado do usuário entre componentes
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserType } from '@/types';

interface UserContextType {
  currentUser: UserType;
  setCurrentUser: (user: UserType) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  // Inicializar com o usuário salvo no localStorage ou null
  const [currentUser, setCurrentUser] = useState<UserType>(() => {
    try {
      const savedUser = localStorage.getItem('soflix_current_user');
      return savedUser as UserType;
    } catch {
      return null;
    }
  });

  const clearUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('soflix_current_user');
  };

  // Função para atualizar o usuário e salvar no localStorage
  const updateCurrentUser = (user: UserType) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('soflix_current_user', user);
    } else {
      localStorage.removeItem('soflix_current_user');
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser: updateCurrentUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
