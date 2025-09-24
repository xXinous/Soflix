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

// Função para gerar fotos especiais baseada APENAS nos dados do filme
const generateSpecialPhotos = (movie: Movie) => {
  if (!movie.specialPhotos || movie.specialPhotos.length === 0) {
    return null;
  }

  // Título simples baseado no título do filme
  const title = `Momentos Especiais de ${movie.title}`;
  
  // Legendas personalizadas do movies.ts ou fallback simples
  const photos = movie.specialPhotos.map((src, index) => ({
    src,
    alt: `Momento especial ${index + 1} de ${movie.title}`,
    caption: movie.specialPhotoCaptions?.[index] || `Momento especial ${index + 1} de ${movie.title}`
  }));

  return (
    <SpecialPhotos 
      title={title}
      photos={photos}
    />
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL DO MOVIE MODAL
// ============================================================================

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const movieDetails = getMovieDetails(movie);

  // Renderizar conteúdo especial automaticamente
  const renderSpecialContent = () => {
    const specialPhotos = generateSpecialPhotos(movie);
    return specialPhotos || <DefaultSpecialContent />;
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
      movieDetails={movieDetails as any}
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