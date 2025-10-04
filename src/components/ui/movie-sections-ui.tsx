import React, { useState, useRef } from 'react';
import { Play, ThumbsUp, Download, Plus } from 'lucide-react';
import { Movie } from '@/types';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';
import { SwiperCarousel } from './swiper-carousel';

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
    movieIds: [ "flip-fever", "o-segredo-da-arvore-magica", "pressagio"],
    gridLayout: 'continue', // ÚNICO layout horizontal (aspect-video)
  },
  {
    id: 'porque-se-apaixonou-por-sofia',
    title: 'Por que você se apaixonou por Sofia:',
    movieIds: ["eu-acredito", "roupa-preta-coracao-azul", "dilema-do-amor", "fade-runner-2099","uau-desordem" ],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'top-10-do-marcelo',
    title: 'Top 5 do Marcelo',
    movieIds: ["amor-em-alta-velocidade", "casal-aranha-teia-do-julgamento","the-pijama-dreamer", "eu-acredito", "beijo-estrelado", ],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
  {
    id: 'baseado-em-historia-real',
    title: 'Popular na cabeça do Marcelo',
    movieIds: ["amor-em-cascata", "motim-estelar", "uau-desordem", "motim-estelar", "troca-troca-juridico" ],
    gridLayout: 'poster', // Layout retrato (aspect-[2/3])
  },
];

// Função para obter filmes de uma seção específica
const getMoviesFromSection = (sectionId: string, allMovies: Movie[]): Movie[] => {
  const section = MOVIE_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  
  // Preservar a ordem definida no movieIds - facilita manutenção
  return section.movieIds
    .map(movieId => allMovies.find(movie => movie.id === movieId))
    .filter((movie): movie is Movie => movie !== undefined);
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
  
  // Estados para detectar arrasto vs clique
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const touchStartTime = useRef<number>(0);
  const DRAG_THRESHOLD = 10; // pixels
  const CLICK_MAX_DURATION = 300; // ms

  // Handler para início do toque
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartPosition({ x: touch.clientX, y: touch.clientY });
    setIsDragging(false);
    setHasMoved(false);
    touchStartTime.current = Date.now();
  };

  // Handler para movimento do toque
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startPosition) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startPosition.x);
    const deltaY = Math.abs(touch.clientY - startPosition.y);
    
    // Se moveu mais que o threshold, considera como arrasto
    if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
      setIsDragging(true);
      setHasMoved(true);
    }
  };

  // Handler para fim do toque
  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime.current;
    
    // Só abre o modal se:
    // 1. Não foi um arrasto (hasMoved = false)
    // 2. O toque foi rápido (menos que CLICK_MAX_DURATION)
    // 3. Não estava arrastando
    if (!hasMoved && !isDragging && touchDuration < CLICK_MAX_DURATION) {
      onMovieClick(movie);
    }
    
    // Reset dos estados
    setIsDragging(false);
    setHasMoved(false);
  };

  // Handler para clique do mouse (desktop)
  const handleClick = () => {
    // No desktop, sempre permite clique
    onMovieClick(movie);
  };
  
  return (
    <div
      className="group cursor-pointer transition-all duration-300"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => onKeyDown(e, movie)}
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
  const progressValues = [75, 45, 65]; // Valores de progresso para "Continue assistindo"
  return (
    <div className="px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-12 relative z-10">
      {/* Continue assistindo */}
      <section>
        <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4">Continue assistindo nossa história</h3>
        <SwiperCarousel 
          className="w-full"
          slideClassName="w-2/3 sm:w-1/3 min-w-0"
          forceDisableLoop={true}
        >
          {continueWatchingMovies.map((movie, index) => (
            <MovieItem
              key={`continue-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="continue"
              progressValue={progressValues[index]}
            />
          ))}
        </SwiperCarousel>
      </section>

      {/* Por que você se apaixonou */}
      <section>
        <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4">Por que você se apaixonou por: Sofia</h3>
        <SwiperCarousel 
          className="w-full"
          slideClassName="w-1/3 sm:w-1/5 min-w-0"
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
        </SwiperCarousel>
      </section>

      {/* Top 10 do Marcelo */}
      <section>
        <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4">Top 5 do Marcelo</h3>
        <SwiperCarousel 
          className="w-full"
          slideClassName="w-1/3 sm:w-1/5 min-w-0"
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
        </SwiperCarousel>
      </section>

      {/* Baseado em uma história real */}
      <section>
        <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4">Popular na cabeça do Marcelo</h3>
        <SwiperCarousel 
          className="w-full"
          slideClassName="w-1/3 sm:w-1/5 min-w-0"
        >
          {getMoviesFromSection('baseado-em-historia-real', allMovies).map((movie) => (
            <MovieItem
              key={`real-${movie.id}`}
              movie={movie}
              onMovieClick={onMovieClick}
              onKeyDown={onKeyDown}
              variant="poster"
              showBadge={true}
              badgeText="★"
              badgeColor="bg-yellow-500"
            />
          ))}
        </SwiperCarousel>
      </section>
    </div>  
  );
};