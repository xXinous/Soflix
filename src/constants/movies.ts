import { Movie } from '@/types';

// Imports dos filmes organizados por pasta
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
import amorEmCascataPoster from '@/assets/amor-em-cascata/poster.png';
import motimEstelarPoster from '@/assets/motim-estelar/poster.png';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Pijama Dreamer",
    image: thePijamaDreamerPoster,
    genre: "Romance, Animação, Fantasia",
    romanticDescription: "Sofia embarca em uma jornada noturna pelo universo etéreo de seus próprios sonhos. Lá, em um reino de cores e maravilhas, os ecos de seu primeiro amor florescem, desafiando a dança sutil entre a pura alegria da paixão e as sombras sussurrantes da insegurança. Uma aventura visualmente deslumbrante pelo coração e mente de uma jovem garota, onde cada sonho é um passo para desvendar os mistérios do amor e do autoconhecimento.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 2,
    title: "Casal-Aranha: Teia do Julgamento",
    image: casalAranhaPoster,
    genre: "Ação, Romântica",
    romanticDescription: "Como o herói desta história, você trouxe justiça ao meu coração caótico. Sua força me inspira, seu amor me protege, e juntos formamos a dupla perfeita. Você é minha parceira de vida, minha heroína, minha Sofia-Aranha que tece os fios do nosso destino conectado para sempre.",
    year: 2025,
    rating: "∞★",
    specialPhotos: [casalAranhaPhoto1, casalAranhaPhoto2, casalAranhaPhoto3]
  },
  {
    id: 3,
    title: "Roupa Preta Coracao Azul",
    image: roupaPretaCoracaoAzulPoster,
    genre: "Romance",
    romanticDescription: "Com o coração em luto e um boné na cabeça, ela lidera um time em campo para honrar um amor e reescrever a história.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 4,
    title: "Dilema do Amor",
    image: dilemaDoAmorPoster,
    genre: "Terror, Suspense",
    romanticDescription: "Entre livros e beijos, ela busca a sentença final. Mas o relógio da vida dupla pode estar quebrado.",
    year: 2025,
    rating: "∞★"
  },
  {
    id: 5,
    title: "Beijo Estrelado",
    image: beijoEstreladoPoster,
    genre: "Drama, Romance",
    romanticDescription: "Em um verão inesquecível de 1986, sob as luzes neon de uma cidade vibrante e as estrelas que prometem segredos, duas almas se encontram por acaso. Uma noite. Um olhar. Uma conexão que desafia o tempo. ",
    year: 2025,
    rating: "10★"
  },
  {
    id: 6,
    title: "Amor em Alta Velocidade",
    image: amoremaltavelocidadePoster,
    genre: "Romance, Animação",
    romanticDescription: "Na praia encontramos nossa conexão mais pura. Cada caminhada na areia, cada pôr do sol contemplado ao seu lado me lembra como somos sortudos por termos encontrado um ao outro neste universo imenso.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 7,
    title: "Troca Troca Juridico",
    image: trocaTrocaJuridicoPoster,
    genre: "Comédia, Família",
    romanticDescription: "Uma briga inocente, uma troca de corpos e a corrida contra o tempo para fazer as pazes... antes que a vida de adulto e de criança virem de cabeça para baixo.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 8,
    title: "Motim Estelar",
    image: motimEstelarPoster,
    genre: "Drama Musical, Biografia",
    romanticDescription: "A inspiradora jornada de Sofia, uma jovem apaixonada por música que transformou seus sonhos em realidade. Desde as primeiras notas em uma guitarra emprestada até os palcos mais famosos do mundo, 'Motim Estelar' conta a emocionante biografia de uma estrela do rock emo que nunca desistiu de seus ideais. Com coragem, determinação e muito talento, Sofia superou todos os obstáculos para se tornar uma das maiores referências da música alternativa. Uma história de paixão, luta e triunfo que prova que os sonhos podem se tornar realidade quando você tem a coragem de lutar por eles.",
    year: 2025,
    rating: "10★"
  }
];
export const AMOR_EM_CASCATA_MOVIE: Movie = {
  id: 9,
  title: "Amor em Cascata",
  image: amorEmCascataPoster,
  genre: "Comédia Romântica",
  romanticDescription: "Almas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar, jogando desafios cômicos e completamente imprevisíveis em seu caminho. De desastres culinários envolvendo polvos gigantes a encontros românticos interrompidos por viagens no tempo e armaduras medievais em pleno metrô, nada é 'normal' para este casal. Mas, apesar de meteoros, filhotes adoráveis com poderes magnéticos e unicórnios, o amor de Mia e Leo é tão inquebrável quanto hilário. Será que eles conseguirão superar o próximo obstáculo impossível e, finalmente, ter um momento de paz... ou o universo sempre terá uma nova surpresa na manga? Uma comédia romântica que prova que, quando o amor é verdadeiro, nem um apocalipse zumbi (quase!) pode atrapalhar.",
  year: 2025,
  rating: "10★"
};
