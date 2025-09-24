import { Movie } from '@/types';
import { MovieSectionsUI } from '@/components/ui/movie-sections-ui';

interface MovieSectionsProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const MovieSections = ({
  movies,
  onMovieClick,
}: MovieSectionsProps) => {

  // Handler para eventos de teclado
  const handleKeyDown = (e: React.KeyboardEvent, movie: Movie) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onMovieClick(movie);
    }
  };

  return (
    <MovieSectionsUI
      allMovies={movies}
      onMovieClick={onMovieClick}
      onKeyDown={handleKeyDown}
    />
  );
};
