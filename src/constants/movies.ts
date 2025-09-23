import { Movie } from '@/types';
import judgmentWebPoster from '@/assets/3fab3ae223a99531b50728c19f476df9a525fc4b.png';
import spiderCouplePhoto1 from '@/assets/49d8db25dd83d3f7e2007f4f01ce6255e232b294.png';
import spiderCouplePhoto2 from '@/assets/4623a5f88ef9e78cd269223ddb4febaaea9d0692.png';
import spiderCouplePhoto3 from '@/assets/93cffdfe55c87ce65943e49b21d2ba8a3ca1de87.png';
import amorEmCascataPoster from '@/assets/fbb4fc8b5d8f5491d8cac4858b367fe46a198acb.png';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Nosso Primeiro Encontro",
    image: "https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NTg0ODgxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Romance",
    romanticDescription: "Aquele dia mudou tudo para sempre. Quando nossos olhares se cruzaram pela primeira vez, soube que encontrei a pessoa com quem quero passar o resto da minha vida. Cada momento ao seu lado é como viver num filme romântico perfeito.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 2,
    title: "Casal-Aranha: Teia do Julgamento",
    image: judgmentWebPoster,
    genre: "Ação, Romântica",
    romanticDescription: "Como o herói desta história, você trouxe justiça ao meu coração caótico. Sua força me inspira, seu amor me protege, e juntos formamos a dupla perfeita. Você é minha parceira de vida, minha heroína, minha Sofia-Aranha que tece os fios do nosso destino conectado para sempre.",
    year: 2025,
    rating: "∞★",
    specialPhotos: [spiderCouplePhoto1, spiderCouplePhoto2, spiderCouplePhoto3]
  },
  {
    id: 3,
    title: "Jantares Românticos",
    image: "https://images.unsplash.com/photo-1564636242997-77953084df48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGRhdGV8ZW58MXx8fHwxNzU4NTY1MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Romance",
    romanticDescription: "Cada jantar ao seu lado é uma celebração do nosso amor. Não importa se é um restaurante sofisticado ou uma pizza em casa, com você qualquer refeição se torna uma ocasião especial. Você tempera minha vida com alegria!",
    year: 2025,
    rating: "10★"
  },
  {
    id: 4,
    title: "Você é Meu Coração",
    image: "https://images.unsplash.com/photo-1506014299253-3725319c0f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHN8ZW58MXx8fHwxNzU4NTcwMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Romance",
    romanticDescription: "Você não é apenas o amor da minha vida, você É minha vida. Meu coração bate no ritmo do seu nome, e cada flor que vejo me lembra da beleza que você trouxe para o meu mundo. Te amo mais que palavras podem expressar!",
    year: 2025,
    rating: "∞★"
  },
  {
    id: 5,
    title: "De Mãos Dadas Para Sempre",
    image: "https://images.unsplash.com/photo-1596806906801-d328b0c8bcc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMHBpY25pYyUyMG5hdHVyZXxlbnwxfHx8fDE3NTg1NzAyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Romance",
    romanticDescription: "Sua mão na minha é onde encontro paz e força. Juntos, podemos enfrentar qualquer tempestade e celebrar cada conquista. Prometo estar sempre ao seu lado, de mãos dadas, caminhando em direção ao nosso futuro repleto de amor.",
    year: 2025,
    rating: "10★"
  },
  {
    id: 6,
    title: "Caminhadas na Praia",
    image: "https://images.unsplash.com/photo-1719559981587-040e4614b4dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwYmVhY2h8ZW58MXx8fHwxNzU4NTYyMDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Romance",
    romanticDescription: "Na praia encontramos nossa conexão mais pura. Cada caminhada na areia, cada pôr do sol contemplado ao seu lado me lembra como somos sortudos por termos encontrado um ao outro neste universo imenso.",
    year: 2025,
    rating: "10★"
  }
];

// Filme especial "Amor em Cascata" - aparece apenas em locais específicos
export const AMOR_EM_CASCATA_MOVIE: Movie = {
  id: 7,
  title: "Amor em Cascata",
  image: amorEmCascataPoster,
  genre: "Comédia Romântica",
  romanticDescription: "lmas gêmeas predestinadas... ou assim pensam. A cada semana, o universo parece ter um senso de humor peculiar, jogando desafios cômicos e completamente imprevisíveis em seu caminho. De desastres culinários envolvendo polvos gigantes a encontros românticos interrompidos por viagens no tempo e armaduras medievais em pleno metrô, nada é 'normal' para este casal. Mas, apesar de meteoros, filhotes adoráveis com poderes magnéticos e unicórnios, o amor de Mia e Leo é tão inquebrável quanto hilário. Será que eles conseguirão superar o próximo obstáculo impossível e, finalmente, ter um momento de paz... ou o universo sempre terá uma nova surpresa na manga? Uma comédia romântica que prova que, quando o amor é verdadeiro, nem um apocalipse zumbi (quase!) pode atrapalhar.",
  year: 2025,
  rating: "10★"
};
