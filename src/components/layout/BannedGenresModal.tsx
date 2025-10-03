import { BANNED_GENRES } from '@/constants';
import { BannedGenresModalUI } from '@/assets/banned-genres-modal-ui';

interface BannedGenresModalProps {
  show: boolean;
  onClose: () => void;
}

export const BannedGenresModal = ({
  show,
  onClose,
}: BannedGenresModalProps) => {
  // Configurações do modal
  const modalConfig = {
    title: "Gêneros Banidos",
    description: "Os seguintes gêneros foram banidos para sempre do nosso catálogo:",
    footerText: "Isso aqui me deixa triste, não quero ver",
  };

  return (
    <BannedGenresModalUI
      show={show}
      genres={[...BANNED_GENRES]}
      onClose={onClose}
      title={modalConfig.title}
      description={modalConfig.description}
      footerText={modalConfig.footerText}
    />
  );
};
