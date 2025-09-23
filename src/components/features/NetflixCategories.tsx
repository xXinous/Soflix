import { AMOR_EM_CASCATA_MOVIE } from '@/constants/movies';
import { NetflixCategoriesUI } from '@/components/ui/netflix-categories-ui';

interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  romanticDescription: string;
  year: number;
  rating: string;
}

interface NetflixCategoriesProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export function NetflixCategories({ movies, onMovieClick }: NetflixCategoriesProps) {
  // Lógica para criar categorias
  const categories = [
    {
      title: "Baseado em uma história real: A nossa",
      movies: [AMOR_EM_CASCATA_MOVIE, ...movies.slice(3, 6)]
    }
  ];

  return (
    <NetflixCategoriesUI
      categories={categories}
      onMovieClick={onMovieClick}
    />
  );
}