import React from 'react';
import { Play, ThumbsUp, Download, Plus } from 'lucide-react';
import { Movie } from '@/types';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';
import { Carousel } from './carousel';

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
    movieIds: ["amor-em-cascata", "flip-fever", "o-segredo-da-arvore-magica", "pressagio"],
    gridLayout: 'continue', // ÚNICO layout horizontal (aspect-video)
  },
  {
    id: 'porque-se-apaixonou-por-sofia',
    title: 'Por que você se apaixonou por: Sofia',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar", "motim-estelar"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'talvez-voce-goste',
    title: 'Talvez você goste',
    movieIds: ["roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado", "troca-troca-juridico"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'top-10-do-marcelo',
    title: 'Top 10 do Marcelo',
    movieIds: ["the-pijama-dreamer", "motim-estelar", "amor-em-cascata", "beijo-estrelado", "dilema-do-amor"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'baseado-em-historia-real',
    title: 'Baseado em uma história real: A nossa',
    movieIds: ["amor-em-cascata", "amor-em-alta-velocidade", "troca-troca-juridico", "the-pijama-dreamer"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'romances-emocionantes',
    title: 'Romances emocionantes',
    movieIds: ["the-pijama-dreamer", "beijo-estrelado", "amor-em-alta-velocidade", "amor-em-cascata"],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  }
];

// Função para obter filmes de uma seção específica
const getMoviesFromSection = (sectionId: string, allMovies: Movie[]): Movie[] => {
  const section = MOVIE_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  
  return allMovies.filter(movie => section.movieIds.includes(movie.id));
};

interface MovieSectionsUIProps {
  allMovies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onKeyDown: (e: React.KeyboardEvent, movie: Movie) => void;
}

// Componente para item de filme no carrossel
interface MovieItemProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onKeyDown: (e: React.KeyboardEvent, movie: Movie) => void;
  variant?: 'poster' | 'continue';
  progressValue?: number;
  showRanking?: boolean;
  ranking?: number;
  showBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  onMovieClick,
  onKeyDown,
  variant = 'poster',
  progressValue,
  showRanking = false,
  ranking,
  showBadge = false,
  badgeText,
  badgeColor = 'bg-red-600'
}) => {
  const aspectRatio = variant === 'continue' ? 'aspect-video' : 'aspect-[2/3]';
  
  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover-lift focus-ring rounded-lg"
      onClick={() => onMovieClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => onKeyDown(e, movie)}
      aria-label={`Assistir ${movie.title}`}
    >
      <div className={`relative rounded-lg overflow-hidden bg-gray-800 ${aspectRatio} mb-2`}>
        <ImageWithFallback
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Badge de ranking */}
        {showRanking && ranking && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold">
            #{ranking}
          </div>
        )}
        
        {/* Badge customizado */}
        {showBadge && badgeText && (
          <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${badgeColor} text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold`}>
            {badgeText}
          </div>
        )}
        
        {/* Barra de progresso para "Continue assistindo" */}
        {variant === 'continue' && progressValue !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div className="h-full bg-red-500" style={{ width: `${progressValue}%` }}></div>
          </div>
        )}
        
        {/* Overlay com informações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-2 sm:p-3 w-full">
            <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h4>
            {variant === 'continue' ? (
              <p className="text-gray-400 text-xs">{movie.year}</p>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            )}
          </div>
        </div>
        
        {/* Ícone de play para "Continue assistindo" */}
        {variant === 'continue' && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
      </div>
      
      {/* Título abaixo do poster (apenas para variante poster) */}
      {variant === 'poster' && (
        <h4 className="font-semibold text-xs sm:text-sm truncate">{movie.title}</h4>
      )}
    </div>
  );
};

export const MovieSectionsUI: React.FC<MovieSectionsUIProps> = ({
  allMovies,
  onMovieClick,
  onKeyDown,
}) => {
  // Obter filmes de cada seção usando a configuração centralizada
  const continueWatchingMovies = getMoviesFromSection('continuar-assistindo', allMovies);
  
  // Função para gerar valores de progresso baseados no ID do filme
  const getProgressValue = (movieId: string): number => {
    const progressMap: Record<string, number> = {
      "amor-em-cascata": 75,
      "flip-fever": 45,
      "o-segredo-da-arvore-magica": 65,
      "pressagio": 30,
    };
    return progressMap[movieId] || 0;
  };
  return (
    <div className="px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-12 relative z-10">
      {/* Continue assistindo */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-2/3 sm:w-1/3 min-w-0"
          title="Continue assistindo nossa história"
          showProgress={true}
        >
          {continueWatchingMovies.map((movie) => (
            <MovieItem
              key={`continue-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="continue"
              progressValue={getProgressValue(movie.id)}
            />
          ))}
        </Carousel>
      </section>

      {/* Por que você se apaixonou */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-1/3 sm:w-1/5 min-w-0"
          title="Por que você se apaixonou por: Sofia"
        >
          {getMoviesFromSection('porque-se-apaixonou-por-sofia', allMovies).map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
            />
          ))}
        </Carousel>
      </section>

      {/* Talvez você goste */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-1/3 sm:w-1/5 min-w-0"
          title="Talvez você goste"
        >
          {getMoviesFromSection('talvez-voce-goste', allMovies).map((movie) => (
            <MovieItem
              key={`maybe-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
            />
          ))}
        </Carousel>
      </section>

      {/* Top 10 do Marcelo */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-1/3 sm:w-1/5 min-w-0"
          title="Top 10 do Marcelo"
        >
          {getMoviesFromSection('top-10-do-marcelo', allMovies).map((movie, index) => (
            <MovieItem
              key={`top10-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
              showRanking={true}
              ranking={index + 1}
            />
          ))}
        </Carousel>
      </section>

      {/* Baseado em uma história real */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-1/3 sm:w-1/5 min-w-0"
          title="Baseado em uma história real: A nossa"
        >
          {getMoviesFromSection('baseado-em-historia-real', allMovies).map((movie) => (
            <MovieItem
              key={`real-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
              showBadge={true}
              badgeText="Real"
              badgeColor="bg-blue-600"
            />
          ))}
        </Carousel>
      </section>

      {/* Romances emocionantes */}
      <section>
        <Carousel 
          className="w-full"
          itemClassName="w-1/3 sm:w-1/5 min-w-0"
          title="Romances emocionantes"
        >
          {getMoviesFromSection('romances-emocionantes', allMovies).map((movie) => (
            <MovieItem
              key={`romance-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
              showBadge={true}
              badgeText="♥"
              badgeColor="bg-pink-600"
            />
          ))}
        </Carousel>
      </section>
    </div>
  );
};

