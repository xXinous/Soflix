import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play, Plus, Clock } from 'lucide-react';
import { Movie } from '@/types';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  movies,
  onMovieClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filtrar filmes baseado na busca
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies([]);
      return;
    }

    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredMovies(filtered);
    setSelectedIndex(0);
  }, [searchQuery, movies]);

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredMovies.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredMovies.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredMovies[selectedIndex]) {
          onMovieClick(filteredMovies[selectedIndex]);
          onClose();
        }
        break;
    }
  };

  // Scroll para o item selecionado
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4">
        <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
          {/* Header da busca */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar filmes, séries, gêneros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={onClose}
              className="ml-3 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              type="button"
              aria-label="Fechar busca"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Resultados da busca */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() && (
              <>
                {filteredMovies.length > 0 ? (
                  <div ref={resultsRef} className="p-2">
                    {filteredMovies.map((movie, index) => (
                      <div
                        key={movie.id}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors
                          ${index === selectedIndex 
                            ? 'bg-red-600/20 border border-red-500/30' 
                            : 'hover:bg-gray-800'
                          }
                        `}
                        onClick={() => {
                          onMovieClick(movie);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="w-12 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-400 truncate">
                            {movie.year} • {movie.genre}
                          </p>
                          {movie.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {movie.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMovieClick(movie);
                              onClose();
                            }}
                            type="button"
                            aria-label={`Assistir ${movie.title}`}
                          >
                            <Play className="w-4 h-4 text-white" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Implementar adicionar à lista
                            }}
                            type="button"
                            aria-label={`Adicionar ${movie.title} à lista`}
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      Nenhum resultado encontrado
                    </h3>
                    <p className="text-gray-500">
                      Tente buscar por outro termo ou verifique a ortografia.
                    </p>
                  </div>
                )}
              </>
            )}

            {!searchQuery.trim() && (
              <div className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Busque por filmes e séries
                </h3>
                <p className="text-gray-500">
                  Digite o nome de um filme, série ou gênero para começar.
                </p>
              </div>
            )}
          </div>

          {/* Dicas de navegação */}
          {filteredMovies.length > 0 && (
            <div className="p-3 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Use ↑↓ para navegar</span>
                <span>Enter para assistir</span>
                <span>Esc para fechar</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

