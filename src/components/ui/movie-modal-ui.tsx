import React from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Download, Share, Heart } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/figma/ImageWithFallback';

// Tipos para informações detalhadas dos filmes
export interface MovieDetails {
  id: string;
  title: string;
  image: string;
  genre: string;
  romanticDescription: string;
  year: number;
  rating: string;
  specialPhotos?: string[];
  
  // Informações específicas do filme
  duration: string;
  classification: string;
  genres: string[];
  romanticQuote: string;
}

interface MovieModalUIProps {
  movieDetails: MovieDetails;
  specialContent: React.ReactNode;
  onClose: () => void;
  onPlay: () => void;
  onAddToList: () => void;
  onLike: () => void;
  onDislike: () => void;
  onDownload: () => void;
  onShare: () => void;
  onHeart: () => void;
}

// Componente para exibir fotos especiais
export const SpecialPhotos: React.FC<{ 
  title: string; 
  photos: Array<{ src: string; alt: string; caption: string }> 
}> = ({ title, photos }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg flex items-center space-x-2">
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-current" />
        <span className="text-sm sm:text-base">{title}</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {photos.map((photo, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-square mb-2 sm:mb-3">
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-2 sm:p-3 md:p-4 w-full">
                  <p className="text-xs sm:text-sm text-white/90 text-center">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para conteúdo padrão
export const DefaultSpecialContent: React.FC = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg">Mais momentos especiais</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal de UI do MovieModal
export const MovieModalUI: React.FC<MovieModalUIProps> = ({
  movieDetails,
  specialContent,
  onClose,
  onPlay,
  onAddToList,
  onLike,
  onDislike,
  onDownload,
  onShare,
  onHeart,
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-80">
          <ImageWithFallback
            src={movieDetails.image}
            alt={movieDetails.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Title and Actions */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2 sm:mb-3 md:mb-4 line-clamp-2">
              {movieDetails.title}
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2">
              <button 
                onClick={onPlay}
                className="bg-white text-black px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center space-x-1 sm:space-x-2 hover:bg-gray-200 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Reproduzir</span>
              </button>
              <button 
                onClick={onAddToList}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={onLike}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={onDislike}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={onDownload}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={onShare}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <Share className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={onHeart}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors flex-shrink-0"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Movie Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <span className="text-green-400 font-semibold text-sm sm:text-base">
              {movieDetails.rating} Compatibilidade
            </span>
            <span className="text-gray-400 text-sm sm:text-base">{movieDetails.year}</span>
            <span className="border border-gray-500 px-2 py-1 text-xs rounded">
              {movieDetails.genre}
            </span>
            <span className="border border-gray-500 px-2 py-1 text-xs rounded">UHD</span>
          </div>

          {/* Romantic Description */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg flex items-center space-x-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-current" />
              <span>Nossa História</span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
              {movieDetails.romanticDescription}
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-gray-700">
            <div className="space-y-2 sm:space-y-3">
              <div className="text-sm sm:text-base">
                <span className="text-gray-400">Gênero: </span>
                <span>{movieDetails.genres.join(', ')}</span>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="text-sm sm:text-base">
                <span className="text-gray-400">Duração: </span>
                <span>{movieDetails.duration}</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="text-gray-400">Classificação: </span>
                <span>{movieDetails.classification}</span>
              </div>
            </div>
          </div>

          {/* Romantic Quote */}
          <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-3 sm:p-4 md:p-6 rounded-lg border-l-4 border-pink-500">
            <p className="text-sm sm:text-base md:text-lg italic text-center">
              "{movieDetails.romanticQuote}"
            </p>
          </div>

          {/* Conteúdo específico do filme */}
          {specialContent}
        </div>
      </div>
    </div>
  );
};