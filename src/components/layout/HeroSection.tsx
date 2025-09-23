import { TimeElapsed } from '@/types';
import { HeroSectionUI } from '@/components/ui/hero-section-ui';
import amorEmCascataPoster from '@/assets/amor-em-cascata/poster.png';

interface HeroSectionProps {
  timeElapsed: TimeElapsed;
  onWatchAmorEmCascata: () => void;
}

export const HeroSection = ({
  timeElapsed,
  onWatchAmorEmCascata,
}: HeroSectionProps) => {
  // Configurações do hero section
  const heroConfig = {
    title: "Nossa História de Amor",
    description: "Uma coleção especial dos nossos momentos mais preciosos juntos",
    timerLabel: "Tempo juntos desde 14/06/2024 às 21h",
    backgroundImage: amorEmCascataPoster,
  };

  // Handlers para as ações
  const handleAddToList = () => {
    console.log('Adicionar à lista');
    // TODO: Implementar lógica de adicionar à lista
  };

  return (
    <HeroSectionUI
      timeElapsed={timeElapsed}
      backgroundImage={heroConfig.backgroundImage}
      title={heroConfig.title}
      description={heroConfig.description}
      onWatch={onWatchAmorEmCascata}
      onAddToList={handleAddToList}
      timerLabel={heroConfig.timerLabel}
    />
  );
};
