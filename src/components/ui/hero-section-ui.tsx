import React from 'react';
import { Play, Plus } from 'lucide-react';
import { TimeElapsed } from '@/types';

interface HeroSectionUIProps {
  timeElapsed: TimeElapsed;
  backgroundImage: string;
  title: string;
  description: string;
  onWatch: () => void;
  onAddToList: () => void;
  timerLabel: string;
}

export const HeroSectionUI: React.FC<HeroSectionUIProps> = ({
  timeElapsed,
  backgroundImage,
  title,
  description,
  onWatch,
  onAddToList,
  timerLabel,
}) => {
  return (
    <div className="relative">
      <div 
        className="h-80 sm:h-96 flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="text-center z-30 px-4 sm:px-6 w-full pt-8 sm:pt-12 pb-6 sm:pb-8 relative">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 leading-tight text-white drop-shadow-lg">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed text-white drop-shadow-md">
            {description}
          </p>
          
          {/* Cronômetro */}
          <div className="bg-black/80 backdrop-blur-lg rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl border border-white/30">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 text-white">
              {timerLabel}:
            </h3>
            <div className={`grid gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-center ${timeElapsed.years > 0 ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'}`}>
              {timeElapsed.years > 0 && (
                <div className="min-w-0">
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                    {timeElapsed.years}
                  </div>
                  <div className="text-xs sm:text-xs md:text-sm text-gray-200">Anos</div>
                </div>
              )}
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.months}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Meses</div>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.weeks}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Semanas</div>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.days}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Dias</div>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.hours}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Horas</div>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.minutes}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Min</div>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-pink-400 truncate">
                  {timeElapsed.seconds}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-200">Seg</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-sm sm:max-w-none mx-auto">
            <button 
              onClick={onWatch}
              className="bg-white text-black px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-md flex items-center space-x-1 sm:space-x-2 hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center min-h-[44px] touch-manipulation shadow-lg"
              type="button"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">Assistir</span>
            </button>
            <button 
              onClick={onAddToList}
              className="bg-gray-600/70 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-md flex items-center space-x-1 sm:space-x-2 hover:bg-gray-600 transition-colors w-full sm:w-auto justify-center min-h-[44px] touch-manipulation shadow-lg"
              type="button"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">Minha Lista</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

