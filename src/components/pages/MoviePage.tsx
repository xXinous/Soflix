/**
 * Página de filme individual
 * Exibe informações detalhadas do filme baseado na URL
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieModal, Header, Footer } from '@/components';
import { useNavigation } from '@/hooks';
import { MOVIES } from '@/constants/movies';
import { slugToMovieTitle } from '@/utils/urlUtils';
import { Movie } from '@/types';

export function MoviePage() {
  const { slug } = useParams<{ slug: string }>();
  const { goBack } = useNavigation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Converter slug para título do filme
      const movieTitle = slugToMovieTitle(slug);
      
      // Encontrar o filme correspondente
      const foundMovie = MOVIES.find(m => m.title === movieTitle);
      
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        console.warn('Filme não encontrado:', movieTitle);
      }
      
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando filme...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Filme não encontrado</h1>
          <p className="text-gray-400 mb-6">O filme que você está procurando não existe.</p>
          <button
            onClick={goBack}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        currentPage="home"
        onPageNavigation={() => {}}
        onBannedGenres={() => {}}
        onToggleMobileMenu={() => {}}
        showMobileMenu={false}
        onUserChange={() => {}}
        currentUser="sofia"
      />
      
      <div className="pt-16">
        <MovieModal
          movie={movie}
          onClose={goBack}
        />
      </div>
      
      <Footer />
    </div>
  );
}
