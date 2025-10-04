import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Converter children para array
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;

  // Calcular largura de um item
  const getItemWidth = () => {
    if (!scrollContainerRef.current || itemCount === 0) return scrollStep;
    return scrollContainerRef.current.scrollWidth / (itemCount * 3); // 3 = original + 2 duplicatas
  };

  // Verificar e ajustar posição para looping infinito
  const checkAndAdjustPosition = () => {
    if (!scrollContainerRef.current || isTransitioning) return;
    
    const container = scrollContainerRef.current;
    const itemWidth = getItemWidth();
    const currentScroll = container.scrollLeft;
    
    // Se estiver no final (última duplicata), voltar ao início
    if (currentScroll >= itemWidth * itemCount * 2) {
      setIsTransitioning(true);
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = itemWidth * itemCount;
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        setIsTransitioning(false);
      }, 50);
    }
    // Se estiver no início (primeira duplicata), ir para o final
    else if (currentScroll <= itemWidth * itemCount) {
      setIsTransitioning(true);
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = itemWidth * itemCount * 2;
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        setIsTransitioning(false);
      }, 50);
    }
  };

  // Scroll para a esquerda
  const scrollLeftHandler = () => {
    if (!scrollContainerRef.current || isTransitioning) return;
    
    const itemWidth = getItemWidth();
    scrollContainerRef.current.scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    });
  };

  // Scroll para a direita
  const scrollRightHandler = () => {
    if (!scrollContainerRef.current || isTransitioning) return;
    
    const itemWidth = getItemWidth();
    scrollContainerRef.current.scrollBy({
      left: itemWidth,
      behavior: 'smooth'
    });
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
  const handleWheel = (e: WheelEvent) => {
    if (!scrollContainerRef.current || isTransitioning) return;
    
    e.preventDefault();
    const itemWidth = getItemWidth();
    scrollContainerRef.current.scrollBy({
      left: e.deltaY > 0 ? itemWidth : -itemWidth,
      behavior: 'smooth'
    });
  };

  // Configurar carousel infinito quando o componente monta
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || itemCount === 0) return;

    const itemWidth = getItemWidth();
    
    // Posicionar no meio (início dos itens originais)
    container.scrollLeft = itemWidth * itemCount;

    const handleScroll = () => {
      checkAndAdjustPosition();
    };

    // Adicionar event listeners
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      const newItemWidth = getItemWidth();
      container.scrollLeft = newItemWidth * itemCount;
    });
    
    // Adicionar event listener para wheel com passive: false
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {});
      container.removeEventListener('wheel', handleWheel);
    };
  }, [children, itemCount]);

  return (
    <div className={`relative group ${className}`}>
      {/* Seta esquerda - sempre visível no carousel infinito */}
      {showArrows && (
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
        className="flex overflow-x-auto overflow-y-visible gap-2 sm:gap-4 scroll-smooth items-start carousel-container py-1"
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carrossel de filmes"
      >
        {/* Primeira duplicata (para transição suave ao voltar) */}
        {React.Children.map(children, (child, index) => (
          <div
            key={`duplicate-start-${index}`}
            className={`flex-shrink-0 ${itemClassName}`}
          >
            {child}
          </div>
        ))}
        
        {/* Itens originais */}
        {React.Children.map(children, (child, index) => (
          <div
            key={`original-${index}`}
            className={`flex-shrink-0 ${itemClassName}`}
          >
            {child}
          </div>
        ))}
        
        {/* Segunda duplicata (para transição suave ao avançar) */}
        {React.Children.map(children, (child, index) => (
          <div
            key={`duplicate-end-${index}`}
            className={`flex-shrink-0 ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Seta direita - sempre visível no carousel infinito */}
      {showArrows && (
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
