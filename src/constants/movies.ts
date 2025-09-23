import { Movie } from '@/types';

import thePijamaDreamerPoster from '@/assets/the-pijama-dreamer/poster.png';
import beijoEstreladoPoster from '@/assets/beijo-estrelado/poster.png';
import casalAranhaPoster from '@/assets/casal-aranha-teia-do-julgamento/poster.png';
import casalAranhaPhoto1 from '@/assets/casal-aranha-teia-do-julgamento/photo1.png';
import casalAranhaPhoto2 from '@/assets/casal-aranha-teia-do-julgamento/photo2.png';
import casalAranhaPhoto3 from '@/assets/casal-aranha-teia-do-julgamento/photo3.png';
import trocaTrocaJuridicoPoster from '@/assets/troca-troca-juridico/poster.png';
import roupaPretaCoracaoAzulPoster from '@/assets/roupa-preta-coracao-azul/poster.png';
import dilemaDoAmorPoster from '@/assets/dilema-do-amor/poster.png';
import amoremaltavelocidadePoster from '@/assets/amor-em-alta-velocidade/poster.png';
import amoremaltavelocidadePhoto1 from '@/assets/amor-em-alta-velocidade/photo1.png';
import amoremaltavelocidadePhoto2 from '@/assets/amor-em-alta-velocidade/photo2.jpg';
import amoremaltavelocidadePhoto3 from '@/assets/amor-em-alta-velocidade/photo3.png';
import amorEmCascataPoster from '@/assets/amor-em-cascata/poster.png';
import motimEstelarPoster from '@/assets/motim-estelar/poster.png';

export interface MovieWithDetails extends Movie {
  duration: string;
  classification: string;
  genres: string[];
  tags: string[];
  romanticQuote: string;
}

// FONTE ÚNICA DE VERDADE - Edite apenas aqui!
const MOVIES_DATA: (Movie & Partial<MovieWithDetails>)[] = [
  {
    id: 1,
    title: "The Pijama Dreamer",
    image: thePijamaDreamerPoster,
    genre: "Romance, Animação, Fantasia",
    romanticDescription: "Sofia embarca em uma jornada noturna pelo universo etéreo de seus próprios sonhos. Lá, em um reino de cores e maravilhas, os ecos de seu primeiro amor florescem, desafiando a dança sutil entre a pura alegria da paixão e as sombras sussurrantes da insegurança. Uma aventura visualmente deslumbrante pelo coração e mente de uma jovem garota, onde cada sonho é um passo para desvendar os mistérios do amor e do autoconhecimento.",
    year: 2025,
    rating: "10★",
    duration: 'Uma noite inteira de sonhos',
    classification: 'L - Livre para sonhar',
    genres: ['Romance', 'Animação', 'Fantasia', 'Sonhos'],
    tags: ['Romântico', 'Ethereal', 'Mágico', 'Inspirador'],
    romanticQuote: 'Nos sonhos encontramos nossa verdade mais profunda, onde o amor floresce sem limites!'
  },
  {
    id: 2,
    title: "Casal-Aranha: Teia do Julgamento",
    image: casalAranhaPoster,
    genre: "Ação, Romântica",
    romanticDescription: "Como o herói desta história, você trouxe justiça ao meu coração caótico. Sua força me inspira, seu amor me protege, e juntos formamos a dupla perfeita. Você é minha parceira de vida, minha heroína, minha Sofia-Aranha que tece os fios do nosso destino conectado para sempre.",
    year: 2025,
    rating: "∞★",
    specialPhotos: [casalAranhaPhoto1, casalAranhaPhoto2, casalAranhaPhoto3],
    duration: 'Para sempre conectados',
    classification: 'L - Livre para amar heroicamente',
    genres: ['Ação', 'Romance', 'Super-herói', 'Justiça'],
    tags: ['Heroico', 'Corajoso', 'Protetor', 'Justo'],
    romanticQuote: 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!'
  },
  {
    id: 3,
    title: "Roupa Preta Coracao Azul",
    image: roupaPretaCoracaoAzulPoster,
    genre: "Romance",
    romanticDescription: "Com o coração em luto e um boné na cabeça, ela lidera um time em campo para honrar um amor e reescrever a história.",
    year: 2025,
    rating: "10★",
    duration: 'Um jogo de coração',
    classification: 'L - Livre para jogar com amor',
    genres: ['Romance', 'Drama', 'Esporte', 'Superação'],
    tags: ['Determinado', 'Forte', 'Líder', 'Vencedor'],
    romanticQuote: 'Mesmo com o coração em luto, ela lidera com amor e coragem!'
  },
  {
    id: 4,
    title: "Dilema do Amor",
    image: dilemaDoAmorPoster,
    genre: "Terror, Suspense",
    romanticDescription: "Entre livros e beijos, ela busca a sentença final. Mas o relógio da vida dupla pode estar quebrado.",
    year: 2025,
    rating: "∞★",
    duration: 'Entre livros e beijos',
    classification: 'L - Livre para estudar o amor',
    genres: ['Romance', 'Drama', 'Suspense', 'Academia'],
    tags: ['Inteligente', 'Misterioso', 'Intenso', 'Apaixonante'],
    romanticQuote: 'Entre livros e beijos, ela busca a sentença final do amor!'
  },
  {
    id: 5,
    title: "Beijo Estrelado",
    image: beijoEstreladoPoster,
    genre: "Drama, Romance",
    romanticDescription: "Em um verão inesquecível de 1986, sob as luzes neon de uma cidade vibrante e as estrelas que prometem segredos, duas almas se encontram por acaso. Uma noite. Um olhar. Uma conexão que desafia o tempo.",
    year: 2025,
    rating: "10★",
    duration: 'Uma noite sob as estrelas',
    classification: 'L - Livre para beijar as estrelas',
    genres: ['Romance', 'Drama', 'Nostalgia', 'Verão'],
    tags: ['Nostálgico', 'Romântico', 'Épico', 'Inesquecível'],
    romanticQuote: 'Sob as estrelas de 1986, duas almas se encontraram para sempre!'
  },
  {
    id: 6,
    title: "Amor em Alta Velocidade",
    image: amoremaltavelocidadePoster,
    genre: "Romance, Animação",
    romanticDescription: "Na praia encontramos nossa conexão mais pura. Cada caminhada na areia, cada pôr do sol contemplado ao seu lado me lembra como somos sortudos por termos encontrado um ao outro neste universo imenso.",
    year: 2025,
    rating: "10★",
    specialPhotos: [amoremaltavelocidadePhoto1, amoremaltavelocidadePhoto2, amoremaltavelocidadePhoto3],
    duration: 'Velocidade do amor infinito',
    classification: 'L - Livre para amar em velocidade máxima',
    genres: ['Romance', 'Aventura', 'Praia', 'Conexão'],
    tags: ['Dinâmico', 'Conectado', 'Praiano', 'Vibrante'],
    romanticQuote: 'Na praia encontramos nossa conexão mais pura. Cada caminhada na areia, cada pôr do sol contemplado ao seu lado me lembra como somos sortudos por termos encontrado um ao outro neste universo imenso.'
  },
  {
    id: 7,
    title: "Troca Troca Juridico",
    image: trocaTrocaJuridicoPoster,
    genre: "Comédia, Família",
    romanticDescription: "Uma briga inocente, uma troca de corpos e a corrida contra o tempo para fazer as pazes... antes que a vida de adulto e de criança virem de cabeça para baixo.",
    year: 2025,
    rating: "10★",
    duration: 'Uma briga inocente, uma lição de amor',
    classification: 'L - Livre para fazer as pazes',
    genres: ['Comédia', 'Família', 'Troca de Corpos', 'Paz'],
    tags: ['Divertido', 'Inocente', 'Familiar', 'Pacífico'],
    romanticQuote: 'Até nas brigas mais inocentes, o amor sempre encontra um jeito de fazer as pazes!'
  },
  {
    id: 8,
    title: "Motim Estelar",
    image: motimEstelarPoster,
    genre: "Drama Musical, Biografia",
    romanticDescription: "A inspiradora jornada de Sofia, uma jovem apaixonada por música que transformou seus sonhos em realidade. Desde as primeiras notas em uma guitarra emprestada até os palcos mais famosos do mundo, 'Motim Estelar' conta a emocionante biografia de uma estrela do rock emo que nunca desistiu de seus ideais. Com coragem, determinação e muito talento, Sofia superou todos os obstáculos para se tornar uma das maiores referências da música alternativa. Uma história de paixão, luta e triunfo que prova que os sonhos podem se tornar realidade quando você tem a coragem de lutar por eles.",
    year: 2025,
    rating: "10★",
    duration: 'Uma biografia musical do coração',
    classification: 'L - Livre para fazer música do amor',
    genres: ['Biografia', 'Musical', 'Drama', 'Rock'],
    tags: ['Inspirador', 'Musical', 'Corajoso', 'Estrela'],
    romanticQuote: 'Com coragem, determinação e muito talento, Sofia superou todos os obstáculos para se tornar uma das maiores referências da música alternativa.'
  },
  {
    id: 9,
    title: "Amor em Cascata",
    image: amorEmCascataPoster,
    genre: "Comédia Romântica",
    romanticDescription: "Almas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar, jogando desafios cômicos e completamente imprevisíveis em seu caminho. De desastres culinários envolvendo polvos gigantes a encontros românticos interrompidos por viagens no tempo e armaduras medievais em pleno metrô, nada é 'normal' para este casal. Mas, apesar de meteoros, filhotes adoráveis com poderes magnéticos e unicórnios, o amor de Mia e Leo é tão inquebrável quanto hilário. Será que eles conseguirão superar o próximo obstáculo impossível e, finalmente, ter um momento de paz... ou o universo sempre terá uma nova surpresa na manga? Uma comédia romântica que prova que, quando o amor é verdadeiro, nem um apocalipse zumbi (quase!) pode atrapalhar.",
    year: 2025,
    rating: "10★",
    duration: 'Uma cascata infinita de amor',
    classification: 'L - Livre para amar em cascata',
    genres: ['Comédia Romântica', 'Fantasia', 'Aventura', 'Destino'],
    tags: ['Hilário', 'Imprevisível', 'Mágico', 'Inquebrável'],
    romanticQuote: 'Almas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar!'
  }
];

// Função para obter detalhes completos de um filme
export const getMovieDetails = (movie: Movie): MovieWithDetails => {
  const movieData = MOVIES_DATA.find(m => m.id === movie.id);
  
  if (!movieData) {
    // Fallback para filmes não encontrados
    return {
      ...movie,
      genres: movie.genre.split(', '),
      duration: 'Para sempre ∞',
      classification: 'L - Livre para amar',
      tags: ['Romântico', 'Emocionante', 'Tocante'],
      romanticQuote: 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!'
    };
  }
  
  return {
    ...movie,
    duration: movieData.duration || 'Para sempre ∞',
    classification: movieData.classification || 'L - Livre para amar',
    genres: movieData.genres || movie.genre.split(', '),
    tags: movieData.tags || ['Romântico', 'Emocionante', 'Tocante'],
    romanticQuote: movieData.romanticQuote || 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!'
  };
};

// Export apenas os dados básicos dos filmes
export const MOVIES: Movie[] = MOVIES_DATA.map(movie => ({
  id: movie.id,
  title: movie.title,
  image: movie.image,
  genre: movie.genre,
  romanticDescription: movie.romanticDescription,
  year: movie.year,
  rating: movie.rating,
  ...(movie.specialPhotos && { specialPhotos: movie.specialPhotos })
}));

// Filme especial (mantido separado como estava)
export const AMOR_EM_CASCATA_MOVIE: Movie = {
  id: 9,
  title: "Amor em Cascata",
  image: amorEmCascataPoster,
  genre: "Comédia Romântica",
  romanticDescription: "Almas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar, jogando desafios cômicos e completamente imprevisíveis em seu caminho. De desastres culinários envolvendo polvos gigantes a encontros românticos interrompidos por viagens no tempo e armaduras medievais em pleno metrô, nada é 'normal' para este casal. Mas, apesar de meteoros, filhotes adoráveis com poderes magnéticos e unicórnios, o amor de Mia e Leo é tão inquebrável quanto hilário. Será que eles conseguirão superar o próximo obstáculo impossível e, finalmente, ter um momento de paz... ou o universo sempre terá uma nova surpresa na manga? Uma comédia romântica que prova que, quando o amor é verdadeiro, nem um apocalipse zumbi (quase!) pode atrapalhar.",
  year: 2025,
  rating: "10★"
};