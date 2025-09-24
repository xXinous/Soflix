import { MovieCategory } from '@/types';

/**
 * CONFIGURAÇÃO DAS CATEGORIAS DE FILMES
 * 
 * Este arquivo define quais filmes aparecem em cada categoria.
 * Para adicionar ou remover filmes de uma categoria, basta editar o array movieIds.
 * 
 * Para adicionar uma nova categoria:
 * 1. Adicione um novo objeto no array categories
 * 2. Defina um id único, título e lista de IDs dos filmes (usando IDs descritivos)
 * 3. Defina a ordem de exibição com displayOrder
 * 4. Ative/desative com isActive
 * 
 * EXEMPLOS DE IDs DESCRITIVOS:
 * - "the-pijama-dreamer"
 * - "casal-aranha-teia-do-julgamento"
 * - "amor-em-alta-velocidade"
 * 
 * Os IDs são mais fáceis de entender que números!
 */

export const MOVIE_CATEGORIES: MovieCategory[] = [
  {
    id: 'porque-se-apaixonou-por-sofia',
    title: 'Porque se apaixonou por Sofia',
    description: 'Os filmes que contam nossa história de amor',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade"], // The Pijama Dreamer, Casal-Aranha, Amor em Alta Velocidade
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'talvez-voce-goste',
    title: 'Talvez você goste',
    description: 'Recomendações baseadas nos seus gostos',
    movieIds: ["roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado"], // Roupa Preta Coração Azul, Dilema do Amor, Beijo Estrelado
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'top-10-do-marcelo',
    title: 'Top 10 do Marcelo',
    description: 'Os favoritos pessoais do Marcelo',
    movieIds: ["the-pijama-dreamer", "motim-estelar", "amor-em-cascata"], // The Pijama Dreamer, Motim Estelar, Amor em Cascata
    displayOrder: 3,
    isActive: true
  },
  {
    id: 'baseado-em-historia-real',
    title: 'Baseado em uma história real: A nossa',
    description: 'Histórias que realmente aconteceram',
    movieIds: ["amor-em-cascata", "amor-em-alta-velocidade", "troca-troca-juridico"], // Amor em Cascata, Amor em Alta Velocidade, Troca Troca Jurídico
    displayOrder: 4,
    isActive: true
  },
  {
    id: 'continuar-assistindo',
    title: 'Continuar assistindo',
    description: 'Onde você parou de assistir',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "roupa-preta-coracao-azul"], // Primeiros 3 filmes
    displayOrder: 0, // Ordem 0 = aparece primeiro
    isActive: true
  },
  {
    id: 'romances-emocionantes',
    title: 'Romances emocionantes',
    description: 'Para chorar de emoção',
    movieIds: ["the-pijama-dreamer", "beijo-estrelado", "amor-em-alta-velocidade"], // The Pijama Dreamer, Beijo Estrelado, Amor em Alta Velocidade
    displayOrder: 5,
    isActive: true
  },
  {
    id: 'acao-e-aventura',
    title: 'Ação e Aventura',
    description: 'Para quem gosta de adrenalina',
    movieIds: ["casal-aranha-teia-do-julgamento", "aventura-estelar"], // Casal-Aranha, Aventura Estelar
    displayOrder: 6,
    isActive: true
  },
  {
    id: 'comedia-e-diversao',
    title: 'Comédia e Diversão',
    description: 'Para rir até chorar',
    movieIds: ["troca-troca-juridico", "amor-em-cascata"], // Troca Troca Jurídico, Amor em Cascata
    displayOrder: 7,
    isActive: true
  },
  {
    id: 'drama-e-suspense',
    title: 'Drama e Suspense',
    description: 'Para quem gosta de emoção',
    movieIds: ["dilema-do-amor", "motim-estelar"], // Dilema do Amor, Motim Estelar
    displayOrder: 8,
    isActive: true
  },
  {
    id: 'categoria-exemplo-desabilitada',
    title: 'Categoria de Exemplo (Desabilitada)',
    description: 'Esta categoria está desabilitada para demonstração',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado"],
    displayOrder: 9,
    isActive: false // Esta categoria não aparecerá
  }
];

/**
 * Função para obter filmes de uma categoria específica
 */
export const getMoviesFromCategory = (categoryId: string, allMovies: any[]) => {
  const category = MOVIE_CATEGORIES.find(cat => cat.id === categoryId && cat.isActive);
  if (!category) return [];
  
  return allMovies.filter(movie => category.movieIds.includes(movie.id));
};

/**
 * Função para obter todas as categorias ativas ordenadas
 */
export const getActiveCategories = () => {
  return MOVIE_CATEGORIES
    .filter(category => category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

/**
 * Função para obter uma categoria específica
 */
export const getCategoryById = (categoryId: string) => {
  return MOVIE_CATEGORIES.find(category => category.id === categoryId);
};

/**
 * Função para verificar se um filme está em uma categoria
 */
export const isMovieInCategory = (movieId: string, categoryId: string) => {
  const category = getCategoryById(categoryId);
  return category ? category.movieIds.includes(movieId) : false;
};

/**
 * Função para obter todas as categorias que contêm um filme específico
 */
export const getCategoriesForMovie = (movieId: string) => {
  return MOVIE_CATEGORIES.filter(category => 
    category.isActive && category.movieIds.includes(movieId)
  );
};
