import { Movie } from '@/types';
import { MovieSectionsUI } from '@/components/ui/movie-sections-ui';
import { PROGRESS_VALUES } from '@/constants';

interface MovieSectionsProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const MovieSections = ({
  movies,
  onMovieClick,
}: MovieSectionsProps) => {
  // Lógica para preparar dados das seções
  const continueWatchingMovies = movies.slice(0, 3);
  const progressValues = PROGRESS_VALUES;

  // Handler para eventos de teclado
  const handleKeyDown = (e: React.KeyboardEvent, movie: Movie) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onMovieClick(movie);
    }
  };

  return (
    <MovieSectionsUI
      continueWatchingMovies={continueWatchingMovies}
      progressValues={progressValues}
      allMovies={movies}
      onMovieClick={onMovieClick}
      onKeyDown={handleKeyDown}
    />
  );
};
