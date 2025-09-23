import React from 'react';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';
import { Movie } from '@/types';

interface Category {
  title: string;
  movies: Movie[];
}

interface NetflixCategoriesUIProps {
  categories: Category[];
  onMovieClick: (movie: Movie) => void;
}

export const NetflixCategoriesUI: React.FC<NetflixCategoriesUIProps> = ({
  categories,
  onMovieClick,
}) => {
  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex}>
          <h3 className="text-xl mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.movies.map((movie) => ( 
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
};

