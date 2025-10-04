import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { 
  Header, 
  HeroSection, 
  MobileMenu, 
  BannedGenresModal,
  MovieSections,
  MovieModal,
  MyList,
  MoviesLetter,
  SeriesLetter,
  UserSelectionPage,
  AdminDashboardPage,
  MoviePage,
  Footer
} from '@/components';
import { useTimer, useMobileMenu, useNavigation } from '@/hooks';
import { MOVIES, AMOR_EM_CASCATA_MOVIE } from '@/constants/movies';
import { PageType, Movie } from '@/types';
import { initializeGlobalTracking, trackGlobalAccess } from '@/utils/globalTracking';

// Componente interno para gerenciar as rotas
function AppRoutes() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showBannedGenres, setShowBannedGenres] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { currentUser, setCurrentUser } = useUser();
  
  const timeElapsed = useTimer();
  const { showMobileMenu, closeMobileMenu, toggleMobileMenu } = useMobileMenu();
  const { goBack } = useNavigation();
  const location = useLocation();

  // Inicializar rastreamento global
  useEffect(() => {
    initializeGlobalTracking();
  }, []);

  // Rastrear mudanças de usuário
  useEffect(() => {
    if (currentUser) {
      trackGlobalAccess(currentUser === 'admin' ? 'admin' : 'sofia');
    }
  }, [currentUser]);

  // Handler para navegação das páginas
  const handlePageNavigation = useCallback((page: PageType) => {
    setCurrentPage(page);
    closeMobileMenu();
    
    // Navegar para a URL correspondente usando React Router
    const pageUrls: Record<PageType, string> = {
      home: '/home',
      series: '/series',
      movies: '/movies',
      mylist: '/mylist'
    };
    
    window.location.href = pageUrls[page];
  }, [closeMobileMenu]);

  // Handler para trocar usuário
  const handleUserChange = useCallback(() => {
    setCurrentUser(null);
    closeMobileMenu();
    // Navegar para /perfis
    window.location.href = '/perfis';
  }, [closeMobileMenu, setCurrentUser]);

  // Handler para gêneros banidos
  const handleBannedGenres = useCallback(() => {
    setShowBannedGenres(true);
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Handler para clique em filme - mostrar modal (igual ao de gêneros banidos)
  const handleMovieClick = useCallback((movie: Movie) => {
    // Mostrar o modal na página inicial
    setSelectedMovie(movie);
  }, []);

  // Handler para abrir "Amor em Cascata" ao clicar em Assistir
  const handleWatchAmorEmCascata = useCallback(() => {
    // Mostrar o modal
    setSelectedMovie(AMOR_EM_CASCATA_MOVIE);
  }, []);

  // Renderização condicional da seleção de usuário
  if (!currentUser) {
    // Redirecionar para /perfis se não há usuário selecionado
    if (location.pathname !== '/perfis') {
      window.location.href = '/perfis';
    }
    return <UserSelectionPage />;
  }

  // Renderização condicional do dashboard admin - agora gerenciado pelo Router
  // if (currentUser === 'admin') {
  //   return <AdminDashboard onBack={() => setCurrentUser(null)} />;
  // }

  // Detectar página baseada na URL
  const getCurrentPageFromUrl = () => {
    if (location.pathname === '/series') return 'series';
    if (location.pathname === '/movies') return 'movies';
    if (location.pathname === '/mylist') return 'mylist';
    return 'home';
  };

  const urlPage = getCurrentPageFromUrl();

  // Renderização condicional das páginas (só para Sofia)
  if (urlPage === 'series') {
    return <SeriesLetter onBack={goBack} />;
  }

  if (urlPage === 'movies') {
    return <MoviesLetter onBack={goBack} />;
  }

  if (urlPage === 'mylist') {
    return <MyList onBack={goBack} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header
        currentPage={urlPage}
        onPageNavigation={handlePageNavigation}
        onBannedGenres={handleBannedGenres}
        onToggleMobileMenu={toggleMobileMenu}
        showMobileMenu={showMobileMenu}
        onUserChange={handleUserChange}
        currentUser={currentUser}
      />

      <HeroSection
        timeElapsed={timeElapsed}
        onWatchAmorEmCascata={handleWatchAmorEmCascata}
      />

      <MovieSections
        movies={MOVIES}
        onMovieClick={handleMovieClick}
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
    </div>
  );
}

// Componente principal com Router
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppRoutes />} />
          <Route path="/home" element={<AppRoutes />} />
          <Route path="/perfis" element={<UserSelectionPage />} />
          <Route path="/dashboard-adm" element={<AdminDashboardPage />} />
          <Route path="/series" element={<AppRoutes />} />
          <Route path="/movies" element={<AppRoutes />} />
          <Route path="/mylist" element={<AppRoutes />} />
          <Route path="/filme/:slug" element={<MoviePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

