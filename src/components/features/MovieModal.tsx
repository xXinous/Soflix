import { Movie } from '@/types';
import { 
  MovieModalUI, 
  SpecialPhotos, 
  DefaultSpecialContent
} from '@/components/ui/movie-modal-ui';
import { getMovieDetails } from '@/constants/movies';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

// Casal-Aranha: Teia do Julgamento - Modal específico
const CasalAranhaModal = ({ movie }: { movie: Movie }) => {
  const casalAranhaPhotos = [
    {
      src: movie.specialPhotos?.[0] || '',
      alt: 'Nosso reflexo perfeito',
      caption: 'Nosso reflexo perfeito: dois corações, uma teia de amor'
    },
    {
      src: movie.specialPhotos?.[1] || '',
      alt: 'Selfie dos heróis',
      caption: 'Selfie dos heróis do amor: sempre juntinhos salvando o dia'
    },
    {
      src: movie.specialPhotos?.[2] || '',
      alt: 'O beijo conecta',
      caption: 'O beijo que conecta nossas almas através da teia do tempo'
    }
  ];
  
  return (
    <SpecialPhotos 
      title="Momentos Especiais do Casal-Aranha"
      photos={casalAranhaPhotos}
    />
  );
};

// Amor em Alta Velocidade - Modal específico
const AmorEmAltaVelocidadeModal = ({ movie }: { movie: Movie }) => {
  const amorAltaVelocidadePhotos = [
    {
      src: movie.specialPhotos?.[0] || '',
      alt: 'Uma foto espontanea da minha princesa com seu principe assustado',
      caption: 'Uma foto espontanea da minha princesa com seu principe assustado diretamente da Disney'
    },
    {
      src: movie.specialPhotos?.[1] || '',
      alt: 'Troca de olhares',
      caption: 'Foi nessa troca de olhares que descobri que valia a pena me apaixonar por você'
    },
    {
      src: movie.specialPhotos?.[2] || '',
      alt: 'Momento do brinquedo freiar',
      caption: 'Graças a Deus o brinquedo tava parando'
    }
  ];
  
  return (
    <SpecialPhotos 
      title="Destaques"
      photos={amorAltaVelocidadePhotos}
    />
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL DO MOVIE MODAL
// ============================================================================

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const movieDetails = getMovieDetails(movie);

  // Renderizar conteúdo específico baseado no ID do filme
  const renderSpecialContent = () => {
    switch (movie.id) {
      case 2: // Casal-Aranha: Teia do Julgamento
        return <CasalAranhaModal movie={movie} />;
      
      case 6: // Amor em Alta Velocidade
        return <AmorEmAltaVelocidadeModal movie={movie} />;
      
      default:
        return <DefaultSpecialContent />;
    }
  };

  // Handlers para as ações do modal
  const handlePlay = () => {
    console.log('Reproduzir filme:', movie.title);
    // TODO: Implementar lógica de reprodução
  };

  const handleAddToList = () => {
    console.log('Adicionar à lista:', movie.title);
    // TODO: Implementar lógica de adicionar à lista
  };

  const handleLike = () => {
    console.log('Curtir filme:', movie.title);
    // TODO: Implementar lógica de curtir
  };

  const handleDislike = () => {
    console.log('Não curtir filme:', movie.title);
    // TODO: Implementar lógica de não curtir
  };

  const handleDownload = () => {
    console.log('Baixar filme:', movie.title);
    // TODO: Implementar lógica de download
  };

  const handleShare = () => {
    console.log('Compartilhar filme:', movie.title);
    // TODO: Implementar lógica de compartilhamento
  };

  const handleHeart = () => {
    console.log('Coração filme:', movie.title);
    // TODO: Implementar lógica de coração
  };

  return (
    <MovieModalUI
      movieDetails={movieDetails}
      specialContent={renderSpecialContent()}
      onClose={onClose}
      onPlay={handlePlay}
      onAddToList={handleAddToList}
      onLike={handleLike}
      onDislike={handleDislike}
      onDownload={handleDownload}
      onShare={handleShare}
      onHeart={handleHeart}
    />
  );
}