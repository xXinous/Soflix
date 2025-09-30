import { useState, useCallback } from 'react';
import { 
  Header, 
  HeroSection, 
  MobileMenu, 
  BannedGenresModal,
  MovieSections,
  MovieModal,
  AdminDashboard,
  MyList,
  MoviesLetter,
  SeriesLetter,
  UserSelection,
  GamePage,
  Footer
} from '@/components';
import { useTimer, useMobileMenu } from '@/hooks';
import { MOVIES, AMOR_EM_CASCATA_MOVIE } from '@/constants/movies';
import { PageType, UserType, Movie } from '@/types';
import { useToast, ToastContainer } from '@/components/ui/toast';
import { LoadingOverlay } from '@/components/ui/loading-spinner';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showBannedGenres, setShowBannedGenres] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const timeElapsed = useTimer();
  const { showMobileMenu, closeMobileMenu, toggleMobileMenu } = useMobileMenu();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Handler para navegação das páginas
  const handlePageNavigation = useCallback((page: PageType) => {
    setIsLoading(true);
    setCurrentPage(page);
    closeMobileMenu();
    
    // Simular loading sem mostrar toast
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [closeMobileMenu]);

  // Handler para trocar usuário
  const handleUserChange = useCallback(() => {
    setCurrentUser(null);
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Handler para gêneros banidos
  const handleBannedGenres = useCallback(() => {
    setShowBannedGenres(true);
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Handler para abrir "Amor em Cascata" ao clicar em Assistir
  const handleWatchAmorEmCascata = useCallback(() => {
    setSelectedMovie(AMOR_EM_CASCATA_MOVIE);
  }, []);

  // Renderização condicional da seleção de usuário
  if (!currentUser) {
    return <UserSelection onUserSelect={setCurrentUser} />;
  }

  // Renderização condicional do dashboard admin
  if (currentUser === 'admin') {
    return <AdminDashboard onBack={() => setCurrentUser(null)} />;
  }

  // Renderização condicional das páginas (só para Sofia)
  if (currentPage === 'series') {
    return <SeriesLetter onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'movies') {
    return <MoviesLetter onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'mylist') {
    return <MyList onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'game') {
    return <GamePage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <LoadingOverlay isLoading={isLoading} text="Carregando...">
        <Header
          currentPage={currentPage}
          onPageNavigation={handlePageNavigation}
          onBannedGenres={handleBannedGenres}
          onToggleMobileMenu={toggleMobileMenu}
          showMobileMenu={showMobileMenu}
          onUserChange={handleUserChange}
          currentUser={currentUser}
          movies={MOVIES}
          onMovieClick={setSelectedMovie}
        />

        <HeroSection
          timeElapsed={timeElapsed}
          onWatchAmorEmCascata={handleWatchAmorEmCascata}
        />

        <MovieSections
          movies={MOVIES}
          onMovieClick={setSelectedMovie}
        />

        <MobileMenu
          showMobileMenu={showMobileMenu}
          currentPage={currentPage}
          onPageNavigation={handlePageNavigation}
          onBannedGenres={handleBannedGenres}
          onUserChange={handleUserChange}
          onClose={closeMobileMenu}
        />

        <BannedGenresModal
          show={showBannedGenres}
          onClose={() => setShowBannedGenres(false)}
        />

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        <Footer />
      </LoadingOverlay>
      
      {/* Sistema de notificações toast */}
      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
        position="top-right"
      />
    </div>
  );
}

export default App;

