import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '@/constants';

export const useMobileMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setShowMobileMenu(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev);
  }, []);

  // Fechar menu mobile ao redimensionar tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= BREAKPOINTS.MD) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMobileMenu]);

  return {
    showMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
  };
};
