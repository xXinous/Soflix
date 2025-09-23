import { Movie } from '@/types';

import thePijamaDreamerPoster from '@/assets/the-pijama-dreamer/poster.png';
import thePijamaDreamerPhoto1 from '@/assets/the-pijama-dreamer/photo1.jpg';
import thePijamaDreamerPhoto2 from '@/assets/the-pijama-dreamer/photo2.jpg';
import thePijamaDreamerPhoto3 from '@/assets/the-pijama-dreamer/photo3.jpg';
import beijoEstreladoPoster from '@/assets/beijo-estrelado/poster.png';
import casalAranhaPoster from '@/assets/casal-aranha-teia-do-julgamento/poster.png';
import casalAranhaPhoto1 from '@/assets/casal-aranha-teia-do-julgamento/photo1.png';
import casalAranhaPhoto2 from '@/assets/casal-aranha-teia-do-julgamento/photo2.png';
import casalAranhaPhoto3 from '@/assets/casal-aranha-teia-do-julgamento/photo3.png';
import trocaTrocaJuridicoPoster from '@/assets/troca-troca-juridico/poster.png';
import trocaTrocaJuridicoPhoto1 from '@/assets/troca-troca-juridico/photo1.jpg';
import trocaTrocaJuridicoPhoto2 from '@/assets/troca-troca-juridico/photo2.jpg';
import trocaTrocaJuridicoPhoto3 from '@/assets/troca-troca-juridico/photo3.jpg';
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
    romanticDescription: "Nem nos meus mais profundos sonhos eu imaginaria que a garota que iria me fisgar era alguém que vive em um mundo tão diferente do meu, mas que se importa e se mostra empenhada para descobrir e conhecer sobre mim e meus gostos, se mostra presente e é a melhor companheira que eu poderia ter.",
    year: 2025,
    rating: "10★",
    specialPhotos: [thePijamaDreamerPhoto1, thePijamaDreamerPhoto2, thePijamaDreamerPhoto3],
    specialPhotoCaptions: [
      'Primeira foto sua que me fez sonhar com a gente',
      'Acada beijo que te dou, é um teste pra ver se não estou sonhando',
      'Quero fazer você viver um sonho'
    ],
    duration: 'Uma noite inteira',
    classification: 'L - Livre para sonhar',
    tags: ['Uma lembraça de noites sonhando com você'],
    romanticQuote: 'Se eu tiver sonhando com você, então eu quero dormir pra sempre.'
  },
  {
    id: 2,
    title: "Casal-Aranha: Teia do Julgamento",
    image: casalAranhaPoster,
    genre: "Ação, Romântica",
    romanticDescription: "Como a heroina desta história, você trouxe justiça ao meu coração caótico. Sua força me inspira, seu carinho me protege, seu sorriso ilumina e espanta todas as tempestades, sua teia concertou meu coração fez eu conseguir amar novamente.",
    year: 2025,
    rating: "∞★",
    specialPhotos: [casalAranhaPhoto1, casalAranhaPhoto2, casalAranhaPhoto3],
    specialPhotoCaptions: [
      'Nosso reflexo perfeito: dois corações, uma teia de amor',
      'Selfie dos heróis do amor: sempre juntinhos salvando o dia',
      'O beijo que conecta nossas almas através da teia do tempo'
    ],
    duration: 'Para sempre conectados',
    classification: 'L - Livre para amar heroicamente',
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
    specialPhotoCaptions: [
      'Uma foto espontanea da minha princesa com seu principe assustado diretamente da Disney',
      'Foi nessa troca de olhares que descobri que valia a pena me apaixonar por você',
      'Graças a Deus o brinquedo tava parando'
    ],
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
    specialPhotos: [trocaTrocaJuridicoPhoto1, trocaTrocaJuridicoPhoto2, trocaTrocaJuridicoPhoto3],
    specialPhotoCaptions: [
      'Uma briga inocente que virou uma lição de amor',
      'A troca que nos ensinou a ver o mundo pelos olhos do outro',
      'O amor sempre encontra um jeito de fazer as pazes'
    ],
    duration: 'Uma briga inocente, uma lição de amor',
    classification: 'L - Livre para fazer as pazes',
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
    tags: ['Hilário', 'Imprevisível', 'Mágico', 'Inquebrável'],
    romanticQuote: 'Almas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar!'
  },
  // EXEMPLO: Novo filme que será adicionado no futuro
  // Este filme não tem configuração específica no MovieModal, mas funcionará automaticamente!
  {
    id: 10,
    title: "Aventura Estelar",
    image: amorEmCascataPoster, // Usando imagem existente como placeholder
    genre: "Ação, Aventura, Romance",
    romanticDescription: "Uma aventura épica pelo espaço onde dois corações se encontram entre as estrelas. Uma história de amor que transcende galáxias e desafia as leis do universo.",
    year: 2025,
    rating: "10★",
    specialPhotos: [amoremaltavelocidadePhoto1, amoremaltavelocidadePhoto2, amoremaltavelocidadePhoto3], // Usando fotos existentes como exemplo
    specialPhotoCaptions: [
      'Nossa primeira aventura espacial juntos',
      'Entre as estrelas, encontramos nosso amor',
      'Uma jornada que transcende galáxias'
    ],
    duration: 'Uma jornada infinita pelo espaço',
    classification: 'L - Livre para explorar o amor',
    tags: ['Épico', 'Aventura', 'Romântico', 'Espacial'],
    romanticQuote: 'Entre as estrelas, encontramos nosso amor infinito!'
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
    romanticQuote: movieData.romanticQuote || 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!',
    specialPhotoCaptions: movieData.specialPhotoCaptions || movie.specialPhotoCaptions
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
  ...(movie.specialPhotos && { specialPhotos: movie.specialPhotos }),
  ...(movie.specialPhotoCaptions && { specialPhotoCaptions: movie.specialPhotoCaptions })
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