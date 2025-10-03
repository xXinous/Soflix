import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  autoScroll?: boolean;
  scrollStep?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = '',
  itemClassName = '',
  showArrows = true,
  scrollStep = 300
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Verificar se pode rolar para os lados
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const canScrollLeftValue = container.scrollLeft > 0;
    const canScrollRightValue = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    
    setCanScrollLeft(canScrollLeftValue);
    setCanScrollRight(canScrollRightValue);
  };

  // Scroll para a esquerda
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollStep,
        behavior: 'smooth'
      });
    }
  };

  // Scroll para a direita
  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollStep,
        behavior: 'smooth'
      });
    }
  };

  // Eventos de mouse para drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  // Eventos de touch para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Eventos de teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeftHandler();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRightHandler();
    }
  };

  // Evento de scroll com roda do mouse
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    
    e.preventDefault();
    const container = scrollContainerRef.current;
    container.scrollBy({
      left: e.deltaY > 0 ? scrollStep : -scrollStep,
      behavior: 'smooth'
    });
  };

  // Verificar scrollability quando o componente monta e quando o scroll muda
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();

    const handleScroll = () => {
      checkScrollability();
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [children]);

  return (
    <div className={`relative group ${className}`} style={{ height: 'auto', minHeight: '200px' }}>
      {/* Seta esquerda */}
      {showArrows && canScrollLeft && (
        <button
          onClick={scrollLeftHandler}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Container do carrossel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto overflow-y-visible gap-2 sm:gap-4 scroll-smooth items-start carousel-container"
        style={{ 
          height: 'auto', 
          minHeight: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingTop: '5px',
          paddingBottom: '5px'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        tabIndex={0}
        role="region"
        aria-label="Carrossel de filmes"
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Seta direita */}
      {showArrows && canScrollRight && (
        <button
          onClick={scrollRightHandler}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
