import { Movie } from '@/types';
//PIJAMA DREAMER
import thePijamaDreamerPoster from '@/assets/the-pijama-dreamer/poster.png';
import thePijamaDreamerPhoto1 from '@/assets/the-pijama-dreamer/photo1.jpg';
import thePijamaDreamerPhoto2 from '@/assets/the-pijama-dreamer/photo2.jpg';
import thePijamaDreamerPhoto3 from '@/assets/the-pijama-dreamer/photo3.jpg';
//O SEGREDO DA ÁRVORE MÁGICA
import oSegredoDaArvoreMagicaPoster from '@/assets/o-segredo-da-arvore-magica/poster.png';
import oSegredoDaArvoreMagicaPhoto1 from '@/assets/o-segredo-da-arvore-magica/photo1.jpg';
import oSegredoDaArvoreMagicaPhoto2 from '@/assets/o-segredo-da-arvore-magica/photo2.jpg';
import oSegredoDaArvoreMagicaPhoto3 from '@/assets/o-segredo-da-arvore-magica/photo3.jpg';
//BEIJO ESTRRELADO
import beijoEstreladoPoster from '@/assets/beijo-estrelado/poster.png';
import beijoEstreladoPhoto1 from '@/assets/beijo-estrelado/photo1.jpg';
import beijoEstreladoPhoto2 from '@/assets/beijo-estrelado/photo2.jpg';
import beijoEstreladoPhoto3 from '@/assets/beijo-estrelado/photo3.jpg';
//FLIP FEVER
import flipFeverPoster from '@/assets/flip-fever/poster.png';
import flipFeverPhoto1 from '@/assets/flip-fever/photo1.jpg';
import flipFeverPhoto2 from '@/assets/flip-fever/photo2.jpg';
import flipFeverPhoto3 from '@/assets/flip-fever/photo3.jpg';
//CASAL-ARANHA: TEIA DO JULGAMENTO
import casalAranhaPoster from '@/assets/casal-aranha-teia-do-julgamento/poster.png';
import casalAranhaPhoto1 from '@/assets/casal-aranha-teia-do-julgamento/photo1.png';
import casalAranhaPhoto2 from '@/assets/casal-aranha-teia-do-julgamento/photo2.png';
import casalAranhaPhoto3 from '@/assets/casal-aranha-teia-do-julgamento/photo3.png';
//TROCA TROCA JURÍDICO
import trocaTrocaJuridicoPoster from '@/assets/troca-troca-juridico/poster.png';
import trocaTrocaJuridicoPhoto1 from '@/assets/troca-troca-juridico/photo1.jpg';
import trocaTrocaJuridicoPhoto2 from '@/assets/troca-troca-juridico/photo2.jpg';
import trocaTrocaJuridicoPhoto3 from '@/assets/troca-troca-juridico/photo3.jpg';
//ROUPA PRETA CORAÇO AZUL
import roupaPretaCoracaoAzulPoster from '@/assets/roupa-preta-coracao-azul/poster.png';     
import roupaPretaCoracaoAzulPhoto1 from '@/assets/roupa-preta-coracao-azul/photo1.jpg';
import roupaPretaCoracaoAzulPhoto2 from '@/assets/roupa-preta-coracao-azul/photo2.jpg';
import roupaPretaCoracaoAzulPhoto3 from '@/assets/roupa-preta-coracao-azul/photo3.jpg';
//DILÉMA DO AMOR
import dilemaDoAmorPoster from '@/assets/dilema-do-amor/poster.png';
import dilemaDoAmorPhoto1 from '@/assets/dilema-do-amor/photo1.jpg';
import dilemaDoAmorPhoto2 from '@/assets/dilema-do-amor/photo2.jpg';
import dilemaDoAmorPhoto3 from '@/assets/dilema-do-amor/photo3.jpg';
//PRESSAGIO
import pressagioPoster from '@/assets/pressagio/poster.png';  
import pressagioPhoto1 from '@/assets/pressagio/photo1.jpg';
import pressagioPhoto2 from '@/assets/pressagio/photo2.jpg';
import pressagioPhoto3 from '@/assets/pressagio/photo3.jpg';
//AMOR EM ALTA VELOCIDADE
import amoremaltavelocidadePoster from '@/assets/amor-em-alta-velocidade/poster.png';
import amoremaltavelocidadePhoto1 from '@/assets/amor-em-alta-velocidade/photo1.png';
import amoremaltavelocidadePhoto2 from '@/assets/amor-em-alta-velocidade/photo2.jpg';
import amoremaltavelocidadePhoto3 from '@/assets/amor-em-alta-velocidade/photo3.png';
//AMOR EM CASCATA
import amorEmCascataPoster from '@/assets/amor-em-cascata/poster.png';
import amorEmCascataPhoto1 from '@/assets/amor-em-cascata/photo1.jpg';
import amorEmCascataPhoto2 from '@/assets/amor-em-cascata/photo2.jpg';
import amorEmCascataPhoto3 from '@/assets/amor-em-cascata/photo3.jpg';
//MOTIM ESTELAR
import motimEstelarPoster from '@/assets/motim-estelar/poster.png';
import motimEstelarPhoto1 from '@/assets/motim-estelar/photo1.jpg';
import motimEstelarPhoto2 from '@/assets/motim-estelar/photo2.jpg';
import motimEstelarPhoto3 from '@/assets/motim-estelar/photo3.jpg';
//EU ACREDITO
import euAcreditoPoster from '@/assets/eu-acredito/poster.png';
import euAcreditoPhoto1 from '@/assets/eu-acredito/photo1.png';
import euAcreditoPhoto2 from '@/assets/eu-acredito/photo2.jpg';
import euAcreditoPhoto3 from '@/assets/eu-acredito/photo3.jpg';
//FADE RUNNER 2099
import fadeRunner2099Poster from '@/assets/fade-runner-2099/poster.png';    
import fadeRunner2099Photo1 from '@/assets/fade-runner-2099/photo1.jpg';
import fadeRunner2099Photo2 from '@/assets/fade-runner-2099/photo2.jpg';
import fadeRunner2099Photo3 from '@/assets/fade-runner-2099/photo3.jpg';
//UAU DESORDEN  
import uauDesordemPoster from '@/assets/uau-desordem/poster.png';
import uauDesordemPhoto1 from '@/assets/uau-desordem/photo1.jpg';
import uauDesordemPhoto2 from '@/assets/uau-desordem/photo2.jpg';
import uauDesordemPhoto3 from '@/assets/uau-desordem/photo3.jpg';
export interface MovieWithDetails extends Movie {
  duration: string;
  classification: string;
  genres: string[];
  romanticQuote: string;
}

// FONTE ÚNICA DE VERDADE - Edite apenas aqui!
const MOVIES_DATA: (Movie & Partial<MovieWithDetails>)[] = [
  {
    id: "the-pijama-dreamer",
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
    romanticQuote: 'Se eu tiver sonhando com você, então eu quero dormir pra sempre.'
  },
  {
    id: "casal-aranha-teia-do-julgamento",
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
    romanticQuote: 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!'
  },
  {
    id: "roupa-preta-coracao-azul",
    title: "Roupa Preta Coracao Azul",
    image: roupaPretaCoracaoAzulPoster,
    genre: "Romance",
    romanticDescription: "Você se se esforça tanto para entrar no meu mundo, que um até um simples boné se tornou o seu símbolo desse esforço. Esse boné mostra que por mais que você seja essa gata preta, tem um interior mole e acok Quero muito conhecer mais do seu mundo e se encaixar mais na sua realidade, assim como voce faz comigo.",
    year: 2025,
    rating: "10★",
    specialPhotos: [roupaPretaCoracaoAzulPhoto1, roupaPretaCoracaoAzulPhoto2, roupaPretaCoracaoAzulPhoto3],
    specialPhotoCaptions: [
      'Vcê sempre complertará o meu coração',
      'Você sempre está com a melhor roupa',
      'você fala que eu te elogio mesmo quando nao da para te ver, mas olha essa mulher que maravilhosa!',
    ],
    duration: 'Um jogo de coração',
    classification: 'L - Livre para jogar com amor',
    romanticQuote: 'Mesmo com o coração em luto, ela lidera com amor e coragem!'
  },
  {
    id: "dilema-do-amor",
    title: "Dilema do Amor",
    image: dilemaDoAmorPoster,
    genre: "Terror, Suspense",
    romanticDescription: "O seu esforço no trabalho e na faculdade é uma das coisas mais lindas e mais incriveis que você tem, sempre me mostrou que é capaz de fazer qualquer e ainda consegue achar um tempo no seu calendario para gente, isso me ganha muito. e o maior filme de terror é quando voce some para estudar ou trabalhar",
    year: 2025,
    rating: "∞★",
    specialPhotos: [dilemaDoAmorPhoto1, dilemaDoAmorPhoto2, dilemaDoAmorPhoto3],
    specialPhotoCaptions: [
      'Eu gosto muito das suas fotos no escuro',
      'Sera q essa gatinha não quer vir me assombrar toda noite?',
      'Até em choque você conseguiu tirar uma foto e ficar bem nela'
    ],
    duration: 'Entre livros e beijos',
    classification: 'L - Livre para estudar o amor',
    romanticQuote: 'Entre livros e beijos, ela busca a sentença final do amor!'
  },
  {
    id: "beijo-estrelado",
    title: "Beijo Estrelado",
    image: beijoEstreladoPoster,
    genre: "Drama, Romance",
    romanticDescription: "Em um verão inesquecível de 1986, sob as luzes neon de uma cidade vibrante e as estrelas que prometem segredos, duas almas se encontram por acaso. Uma noite. Um olhar. Uma conexão que desafia o tempo.",
    year: 2025,
    rating: "10★",
    specialPhotos: [beijoEstreladoPhoto1, beijoEstreladoPhoto2, beijoEstreladoPhoto3],
    specialPhotoCaptions: [
      'A gente não estava nada sobrio, mas eu queria muito te beijar',
      'Você me deu o cargo de Segurança do Banheiro',
      'Ao menos o beijo me fez me sentir nas estrelas'
    ],
    duration: 'Uma noite sob as estreslas',
    classification: 'L - Livre para beijar as estrelas',
    romanticQuote: 'Sob as estrelas de 1986, duas almas se encontraram para sempre!'
  },
  {
    id: "amor-em-alta-velocidade",
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
    romanticQuote: 'Na praia encontramos nossa conexão mais pura. Cada caminhada na areia, cada pôr do sol contemplado ao seu lado me lembra como somos sortudos por termos encontrado um ao outro neste universo imenso.'
  },
  {
    id: "troca-troca-juridico",
    title: "Troca Troca Juridico",
    image: trocaTrocaJuridicoPoster,
    genre: "Comédia, Família",
    romanticDescription: "A sua dinamica com seu sobrinho é muito divertida, tirando a sua armadura e mostrando o seu interior mole quando ta com ele, gosto muito de ouvir as historias de vocês brincando, sinto que é um dos momentos que você mais relaxa durante o seu dia.",
    year: 2025,
    rating: "10★",
    specialPhotos: [trocaTrocaJuridicoPhoto1, trocaTrocaJuridicoPhoto2, trocaTrocaJuridicoPhoto3],
    specialPhotoCaptions: [
      'Eu super vejo você e ele trocando de lugares como em "sexta-feira muito louca".',
      'Eu amo essas fotos...',
      'Se você invadir a minha casa pra entregar os presentes de natal, que você seja o presente.'
    ],
    duration: 'Uma briga inocente, uma lição de amor',
    classification: 'L - Livre para fazer as pazes',
    romanticQuote: 'Até nas brigas mais inocentes, o amor sempre encontra um jeito de fazer as pazes!'
  },
  {
    id: "motim-estelar",
    title: "Motim Estelar",
    image: motimEstelarPoster,
    genre: "Drama Musical, Biografia",
    romanticDescription: "Como uma gata preta, seu lado emo rockeira quase não aparece por mais que tenha todo o espirito de uma rockstar. A rebeldia, a raiva, a vontade de reclamar e a rotina noturna, são os detalhes em ti que te fazem ser a lider de uma banda de rock, entao deixe esse seu lado explosivo e rebelde se manifestar, seja essa explosão de garota que tem dentro de ti e não deixe os sentimentos ficarem dentro de ti.",
    year: 2025,
    rating: "10★",
    specialPhotos: [motimEstelarPhoto1, motimEstelarPhoto2, motimEstelarPhoto3],
    specialPhotoCaptions: [
      'ROCKSTAR',
      'A gata preta que te faz ser a lider de uma banda de rock',
      'Essa é nossa foto que eu MAIS gosto, tirada no dia que assistimos o filme que desperta seu lado rock interior'
    ],
    duration: 'Uma biografia musical do coração',
    classification: 'L - Livre para fazer música do amor',
    romanticQuote: 'Minha Arabella.'
  },
  {
    id: "amor-em-cascata",
    title: "Amor em Cascata",
    image: amorEmCascataPoster,
    genre: "Comédia Romântica",
    romanticDescription: "Eu não sei você, mas eu sinto que o universo queria juntar a gente, e quando juntou ele colocou algumas dificuldades para gente evoluir e solidificar construirmos uma boa base para nossa historia. São rotinas, mundos, traumas e experiencias ruins no passado e imprevistos do presenteque fazem a gente crescer e nos tornar melhores. Tentando ser alguem melhor a cada dia, mostrando que pode cair um alienigina do céu mas isso não vai ser motivo para dificultar o que nos sentimos.",
    year: 2025,
    rating: "10★",
    specialPhotos: [amorEmCascataPhoto1, amorEmCascataPhoto2, amorEmCascataPhoto3],
    specialPhotoCaptions: [
      'O dia que considero o mais importante até agora, onde colocamos muitas fraquezas nossas a mostra e tivemos um momento ó nosso (e da menina chorando, tadinha)',
      'Aqui tivemos nosso primeiro papo mais intimo, foi bom ver que você estava sempre me ouvindo atentamente',
      'Eu estava muito nervoso para te apresentar aos meus amigos esse dia, mas foi incrivel ver vocês todos juntos'
    ],
    duration: 'Uma cascata infinita de amor',
    classification: 'L - Livre para amar em cascata',
    romanticQuote: 'O universo juntou e agora ta nos testando, que teste mais!!!!'
  },
  {
    id: "flip-fever",
    title: "Flip Fever",
    image: flipFeverPoster,
    genre: "Aventura, Comédia, Romance",
    romanticDescription: "Depois de um date acabando mais cedo no parque, foi muito divertido a ida na HotZone, alem de jogarmos e nos divertimos bastante, compramos roupas novas que ficaram muito bem em mim, graças a você me ajudando, alem do meu primeiro site sendo feito pra ti, um presente que levei algumas semanas pra fazer e entregar pra voce encheu meu coração, você ficou com os olhos cheios de lagrimas emocionada e sem saber o que falar me enchei de beijos, eu consegui entender exatamente o que você estava queria dizer com cada um deles ",
    rating: "10★",
    year: 2025,
    specialPhotos: [flipFeverPhoto1, flipFeverPhoto2, flipFeverPhoto3],
    specialPhotoCaptions: [
      'Nosso dia no flip foi incrivel, não sabia das suas habilidades no pinball',
      'Conseguimos varios pontos e finalizamos com um sushi',
      'Mas a maior pontuação foi quando você viu meu presente no celular e ficou com os olhos cheios de lagrimas emocionada '
    ],
    duration: 'Para sempre',
    classification: 'L - Livre para amar',
    romanticQuote: 'Nenhum dos premios é melhor do que estar nos seus braços'
  },
  {
    id: "pressagio",
    title: "Pressagio",
    image: pressagioPoster,
    genre: "Terror, Suspense",
    romanticDescription: "É, tava predestinado a gente se encontrar, foram varias oportunidades e varias chances que foi aparecendo, e finalmente aconteceu e agora tem sido a melhor coisa da minha vida.",
    year: 2025,
    rating: "10★",
    specialPhotos: [pressagioPhoto1, pressagioPhoto2, pressagioPhoto3],
    specialPhotoCaptions: [
      'Metade do rosto pra mostrar que é misteriosa',
      'Se eu soubesse que essa boquinha me faz muito feliz, eu teria feito uma tatuagem dela em mim',
      'A foto só não ta escura por que você ilumina tudo com o seu brilho'
    ],
    duration: 'Simplesmente predestinado',
    classification: 'L - Livre para explorar o amor',
    romanticQuote: 'Sonho com você todos os dias, não me mata por favor!!!'
  },
  {id: "eu-acredito",
    title: "Eu Acredito",
    image: euAcreditoPoster,
    genre: "Romance",
    romanticDescription: "Você me fez acreditar, me fez voltar a querer me esforçar, me faz querer me entregar e fazer dar certo. Foram anos com esse sentimento tendo morto dentro de mim, mas você desenterrou ele, e agora EU ACREDITO NO AMOR.",
    year: 2025,
    rating: "10★",
    specialPhotos: [euAcreditoPhoto1, euAcreditoPhoto2, euAcreditoPhoto3],
    specialPhotoCaptions: [
      'A segunda foto que mais gosto da gente',
      'Essa é a minha favorita e usarei em tudo',
      'EU adoro essas fotos nossa no parque, espero q você também goste'
    ],
    duration: 'IM BELIVER',
    classification: 'L - Livre para amar',
    romanticQuote: 'Assim que eu vi seu rosto, passei a acreditar'
  },
  {id: "o-segredo-da-arvore-magica",
    title: "O Segredo da Árvore Mágica",
    image: oSegredoDaArvoreMagicaPoster,
    genre: "Ação, Aventura, Romance",
    romanticDescription: "O dia que eu conheci o seu bairro, fomos no tao falado COBRA e pegamos mais um tubarão para você (depois de você perder de forma bem feia na sinuca, 2 vezes), criamos assim uma familia de tubas em seu quarto. ",
    year: 2025,
    rating: "10★",
    specialPhotos: [oSegredoDaArvoreMagicaPhoto1, oSegredoDaArvoreMagicaPhoto2, oSegredoDaArvoreMagicaPhoto3],
    specialPhotoCaptions: [
      'Nessa foto parecemos que somos bem mais velho do que realmente somos, mas ainda somos o casal mais bonito do ambiente',
      'Depois de me dar uma bronca por que você queria tirar foto da arvore e eu falando para ficarmos contra a luz dela kk mas saiu uma otima foto',
      'EU SOU O CARA MAIS FELIZ DO MUNDO'
    ],
    duration: 'O mesmo periodo de vida de uma arvore',
    classification: 'L - Livre para amar',
    romanticQuote: 'Não é segredo pra ninguém que você é tudo que eu sempre quis.'
  },
  {id: "uau-desordem",
    title: "Uau Desordem",
    image: uauDesordemPoster,
    genre: "Ação, Aventura, Romance",
    romanticDescription: "Seu lado juridico, criminalista e invertigadora, que gosta de conteudos mais densos e pesados, me mostram",
    year: 2025,
    rating: "10★",
    specialPhotos: [uauDesordemPhoto1, uauDesordemPhoto2, uauDesordemPhoto3],
    specialPhotoCaptions: [
      'Nossa primeira aventura espacial juntos',
      'Entre as estrelas, encontramos nosso amor',
      'Uma jornada que transcende galáxias'
    ],
    duration: 'Uma jornada infinita pelo espaço',
    classification: 'L - Livre para explorar o amor',
    romanticQuote: 'Entre as estrelas, encontramos nosso amor infinito!'
  },
  {id: "fade-runner-2099",
    title: "Fade Runner 2099",
    image: fadeRunner2099Poster,
    genre: "Ação, Aventura, Romance",
    romanticDescription: "Como em um universo paralelo ou um futuro distopico, quando estamos juntos parece que fomamos nossas proprias leis da fisica, o tempo não funciona igual, a pressão não existe e tudo que importa é você",
    year: 2025,
    rating: "10★",
    specialPhotos: [fadeRunner2099Photo1, fadeRunner2099Photo2, fadeRunner2099Photo3],
    specialPhotoCaptions: [
      'As fotos que tiramos esse dia são as mais incriveis, foi um otimo ensaio fotografico',
      'RECEBA MEO AMOOOR!',
      'Fica ai fazendo biquinho pra ver o que acontece'
    ],
    duration: 'Uma jornada infinita pelo espaço',
    classification: 'L - Livre para explorar o amor',
    romanticQuote: 'Sei que nao vai ser um filme facil de fazer, mas eu acredito que conseguiremos'
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
      romanticQuote: 'Com grandes poderes vêm grandes responsabilidades... e com grande amor vem grande felicidade!'
    };
  }
  
  return {
    ...movie,
    duration: movieData.duration || 'Para sempre ∞',
    classification: movieData.classification || 'L - Livre para amar',
    genres: movieData.genres || movie.genre.split(', '),
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

// Export específico para o filme "Amor em Cascata"
export const AMOR_EM_CASCATA_MOVIE: Movie = MOVIES.find(movie => movie.id === 'amor-em-cascata')!;
