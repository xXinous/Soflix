import React from 'react';
import { X } from 'lucide-react';
import { BANNED_GENRES } from '@/constants';

interface BannedGenresModalProps {
  show: boolean;
  onClose: () => void;
}

export const BannedGenresModal: React.FC<BannedGenresModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 rounded-lg max-w-sm sm:max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Gêneros Banidos</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            type="button"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
          Os seguintes gêneros foram banidos para sempre do nosso catálogo:
        </p>
        <div className="space-y-2 sm:space-y-3">
          {BANNED_GENRES.map((genre, index) => (
            <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <span className="text-red-300 text-sm sm:text-base">{genre}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400 italic">
            "Isso aqui me deixa triste, não quero ver"
          </p>
        </div>
      </div>
    </div>
  );
};
