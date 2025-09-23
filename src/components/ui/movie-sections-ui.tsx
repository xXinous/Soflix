import React from 'react';
import { Play, ThumbsUp, Download, Plus } from 'lucide-react';
import { Movie } from '@/types';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';

interface MovieSectionsUIProps {
  continueWatchingMovies: Movie[];
  progressValues: number[];
  allMovies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onKeyDown: (e: React.KeyboardEvent, movie: Movie) => void;
}

export const MovieSectionsUI: React.FC<MovieSectionsUIProps> = ({
  continueWatchingMovies,
  progressValues,
  allMovies,
  onMovieClick,
  onKeyDown,
}) => {
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
          {allMovies.map((movie) => (
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {allMovies.slice(0, 4).map((movie) => (
            <div
              key={`maybe-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 sm:p-3 w-full">
                    <h4 className="font-semibold text-xs sm:text-sm truncate">{movie.title}</h4>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {allMovies.slice(0, 4).map((movie, index) => (
            <div
              key={`top10-${movie.id}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => onMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyDown(e, movie)}
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
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
                    <h4 className="font-semibold text-xs sm:text-sm truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-300 mt-1 truncate">{movie.rating} • {movie.year}</p>
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

