import React from 'react';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';
import { AMOR_EM_CASCATA_MOVIE } from '@/constants/movies';

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
  const categories = [
    {
      title: "Baseado em uma história real: A nossa",
      movies: [AMOR_EM_CASCATA_MOVIE, ...movies.slice(3, 6)]
    }
  ];

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex}>
          <h3 className="text-xl mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.movies.map((movie, index) => (
              <div
                key={`${categoryIndex}-${movie.id}`}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => onMovieClick(movie)}
              >
                <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
                  <ImageWithFallback
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 w-full">
                      <h4 className="font-semibold text-sm">{movie.title}</h4>
                      <p className="text-xs text-gray-300 mt-1">{movie.rating} • {movie.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}