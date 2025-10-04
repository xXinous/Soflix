import React, { useRef, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importar estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

interface SwiperCarouselProps {
  children: React.ReactNode;
  className?: string;
  slideClassName?: string;
  showArrows?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  freeMode?: boolean;
  forceDisableLoop?: boolean; // Nova prop para forçar desabilitação do loop
  breakpoints?: {
    [width: number]: {
      slidesPerView: number | 'auto';
      spaceBetween: number;
    };
  };
}

export const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  children,
  className = '',
  slideClassName = '',
  showArrows = true,
  showPagination = false,
  autoplay = false,
  autoplayDelay = 3000,
  slidesPerView = 'auto',
  spaceBetween = 16,
  loop = true,
  freeMode = false,
  forceDisableLoop = false,
  breakpoints = {
    640: {
      slidesPerView: 'auto',
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 24,
    },
  },
}) => {
  const swiperRef = useRef<any>(null);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
  
  // Desabilitar loop completamente se há poucos slides ou problemas
  // Para slidesPerView: 'auto', precisamos de pelo menos 5 slides para loop funcionar bem
  // OU se forceDisableLoop estiver ativo
  const shouldLoop = useMemo(() => 
    !forceDisableLoop && loop && childrenArray.length >= 5, 
    [forceDisableLoop, loop, childrenArray.length]
  );
  
  // Configuração específica para evitar avisos e melhorar performance
  const swiperConfig = useMemo(() => shouldLoop ? {
    loop: true,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    allowTouchMove: true,
    resistance: true,
    resistanceRatio: 0.85,
    speed: 300,
    effect: 'slide',
    grabCursor: true,
  } : {
    loop: false,
    allowTouchMove: true,
    resistance: true,
    resistanceRatio: 0.85,
    speed: 300,
    effect: 'slide',
    grabCursor: true,
  }, [shouldLoop]);
  

  const handlePrev = useCallback(() => {
    if (swiperRef.current && swiperRef.current.slidePrev) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current && swiperRef.current.slideNext) {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {/* Seta esquerda - só mostrar se há slides suficientes */}
      {showArrows && childrenArray.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Swiper Container */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        freeMode={freeMode}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
        } : false}
        breakpoints={breakpoints}
        direction="horizontal"
        touchRatio={1}
        threshold={5}
        longSwipesRatio={0.5}
        longSwipesMs={300}
        shortSwipes={true}
        {...swiperConfig}
        className="!overflow-visible"
        style={{
          padding: '8px 0',
        }}
      >
        {childrenArray.map((child, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Seta direita - só mostrar se há slides suficientes */}
      {showArrows && childrenArray.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Paginação */}
      {showPagination && (
        <div className="swiper-pagination !bottom-0 !relative !mt-4"></div>
      )}
    </div>
  );
};
