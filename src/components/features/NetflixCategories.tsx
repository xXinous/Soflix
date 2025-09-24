// DEPRECATED: Este componente não é mais usado
// Todo o gerenciamento de seções agora está centralizado em movie-sections-ui.tsx
// 
// Para gerenciar seções/categorias, edite o arquivo:
// src/components/ui/movie-sections-ui.tsx

import { Movie } from '@/types';

interface NetflixCategoriesProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export function NetflixCategories({ movies, onMovieClick }: NetflixCategoriesProps) {
  // Componente desabilitado - use MovieSections em vez disso
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl text-gray-400 mb-4">
        Seções movidas para o sistema centralizado
      </h2>
      <p className="text-gray-500">
        Todas as seções agora são gerenciadas em <code className="bg-gray-800 px-2 py-1 rounded">movie-sections-ui.tsx</code>
      </p>
    </div>
  );
}