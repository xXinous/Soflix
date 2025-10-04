/**
 * Hook personalizado para gerenciamento de navegação
 * Integra com React Router e mantém histórico local
 */

import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  getNavigationHistory, 
  addToNavigationHistory, 
  getPreviousPage, 
  removeCurrentFromHistory,
  clearNavigationHistory
} from '@/utils/urlUtils';

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navegar para uma página específica
  const navigateTo = useCallback((path: string) => {
    // Adicionar página atual ao histórico antes de navegar
    addToNavigationHistory(location.pathname);
    navigate(path);
  }, [navigate, location.pathname]);

  // Voltar para a página anterior
  const goBack = useCallback(() => {
    const previousPage = getPreviousPage();
    
    if (previousPage) {
      // Remover página atual do histórico
      removeCurrentFromHistory();
      navigate(previousPage);
    } else {
      // Se não há histórico, voltar para home
      navigate('/');
    }
  }, [navigate]);

  // Navegar para home
  const goHome = useCallback(() => {
    addToNavigationHistory(location.pathname);
    navigate('/home');
  }, [navigate, location.pathname]);

  // Navegar para um filme específico
  const navigateToMovie = useCallback((movieSlug: string) => {
    addToNavigationHistory(location.pathname);
    navigate(`/filme/${movieSlug}`);
  }, [navigate, location.pathname]);

  // Limpar histórico
  const clearHistory = useCallback(() => {
    clearNavigationHistory();
  }, []);

  return {
    navigateTo,
    goBack,
    goHome,
    navigateToMovie,
    clearHistory,
    currentPath: location.pathname,
    canGoBack: getNavigationHistory().length > 1
  };
}
