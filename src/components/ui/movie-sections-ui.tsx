import React from 'react';
import { Play, ThumbsUp, Download, Plus } from 'lucide-react';
import { Movie } from '@/types';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';

// ============================================================================
// CONFIGURAÇÃO CENTRALIZADA DAS CATEGORIAS/SEÇÕES
// ============================================================================
// Edite apenas aqui para gerenciar quais filmes aparecem em cada seção!

interface MovieSection {
  id: string;
  title: string;
  movieIds: string[];
  gridLayout: 'continue' | 'poster' | 'horizontal';
  maxItems?: number;
}

const MOVIE_SECTIONS: MovieSection[] = [
  {
    id: 'continuar-assistindo',
    title: 'Continue assistindo nossa história',
    movieIds: ["amor-em-cascata", "flip-fever", "o-segredo-da-arvore-magica"],
    gridLayout: 'continue', // ÚNICO layout horizontal (aspect-video)
    maxItems: 3
  },
  {
    id: 'porque-se-apaixonou-por-sofia',
    title: 'Por que você se apaixonou por: Sofia',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar", "motim-estelar"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
    maxItems: 6
  },
  {
    id: 'talvez-voce-goste',
    title: 'Talvez você goste',
    movieIds: ["roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado", "troca-troca-juridico"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
    maxItems: 4
  },
  {
    id: 'top-10-do-marcelo',
    title: 'Top 10 do Marcelo',
    movieIds: ["the-pijama-dreamer", "motim-estelar", "amor-em-cascata", "beijo-estrelado", "dilema-do-amor"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
    maxItems: 4
  },
  {
    id: 'baseado-em-historia-real',
    title: 'Baseado em uma história real: A nossa',
    movieIds: ["amor-em-cascata", "amor-em-alta-velocidade", "troca-troca-juridico", "the-pijama-dreamer"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
    maxItems: 4
  },
  {
    id: 'romances-emocionantes',
    title: 'Romances emocionantes',
    movieIds: ["the-pijama-dreamer", "beijo-estrelado", "amor-em-alta-velocidade", "amor-em-cascata"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
    maxItems: 4
  }
];

// Função para obter filmes de uma seção específica
const getMoviesFromSection = (sectionId: string, allMovies: Movie[]): Movie[] => {
  const section = MOVIE_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  
  const movies = allMovies.filter(movie => section.movieIds.includes(movie.id));
  return section.maxItems ? movies.slice(0, section.maxItems) : movies;
};

interface MovieSectionsUIProps {
  allMovies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onKeyDown: (e: React.KeyboardEvent, movie: Movie) => void;
}

export const MovieSectionsUI: React.FC<MovieSectionsUIProps> = ({
  allMovies,
  onMovieClick,
  onKeyDown,
}) => {
  // Obter filmes de cada seção usando a configuração centralizada
  const continueWatchingMovies = getMoviesFromSection('continuar-assistindo', allMovies);
  const progressValues = [75, 45, 65]; // Valores de progresso para "Continue assistindo"
  return (
    <div className="px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 relative z-10">
      {/* Continue assistindo */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Continue assistindo nossa história</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {continueWatchingMovies.map((movie, index) => (
            <div
              key={`continue-${movie.id}`}
              className="group cursor-pointer"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video mb-2">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div className="h-full bg-red-500" style={{ width: `${progressValues[index]}%` }}></div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
              <p className="text-gray-400 text-xs">{movie.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por que você se apaixonou */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Por que você se apaixonou por: Sofia</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {getMoviesFromSection('porque-se-apaixonou-por-sofia', allMovies).map((movie) => (
            <div
              key={movie.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Talvez você goste */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Talvez você goste</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {getMoviesFromSection('talvez-voce-goste', allMovies).map((movie) => (
            <div
              key={`maybe-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 do Marcelo */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Top 10 do Marcelo</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {getMoviesFromSection('top-10-do-marcelo', allMovies).map((movie, index) => (
            <div
              key={`top10-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold">
                  #{index + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-300 truncate">{movie.rating} • {movie.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Baseado em uma história real */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Baseado em uma história real: A nossa</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {getMoviesFromSection('baseado-em-historia-real', allMovies).map((movie) => (
            <div
              key={`real-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-blue-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold">
                  Real
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-300 truncate">{movie.rating} • {movie.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Romances emocionantes */}
      <section>
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Romances emocionantes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {getMoviesFromSection('romances-emocionantes', allMovies).map((movie) => (
            <div
              key={`romance-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-pink-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold">
                  ♥
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-300 truncate">{movie.rating} • {movie.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

