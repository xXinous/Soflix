/**
 * Utilitários para gerenciamento de URLs
 * Converte títulos de filmes em URLs amigáveis
 */

import { Movie } from '@/types';

/**
 * Converte um título de filme em uma URL amigável
 */
export function movieTitleToSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

/**
 * Converte uma URL amigável de volta para o título original
 */
export function slugToMovieTitle(slug: string): string {
  // Mapear slugs conhecidos para títulos originais
  const slugToTitleMap: Record<string, string> = {
    'amor-em-alta-velocidade': 'Amor em Alta Velocidade',
    'amor-em-cascata': 'Amor em Cascata',
    'beijo-estrelado': 'Beijo Estrelado',
    'casal-aranha-teia-do-julgamento': 'Casal Aranha: Teia do Julgamento',
    'dilema-do-amor': 'Dilema do Amor',
    'eu-acredito': 'Eu Acredito',
    'fade-runner-2099': 'Fade Runner 2099',
    'flip-fever': 'Flip Fever',
    'motim-estelar': 'Motim Estelar',
    'o-segredo-da-arvore-magica': 'O Segredo da Árvore Mágica',
    'pressagio': 'Pressagio',
    'roupa-preta-coracao-azul': 'Roupa Preta, Coração Azul',
    'the-pijama-dreamer': 'The Pijama Dreamer',
    'troca-troca-juridico': 'Troca Troca Jurídico',
    'uau-desordem': 'Uau! Desordem'
  };

  return slugToTitleMap[slug] || slug;
}

/**
 * Gera a URL completa para um filme
 */
export function getMovieUrl(movie: Movie): string {
  const slug = movieTitleToSlug(movie.title);
  return `/filme/${slug}`;
}

/**
 * Extrai o slug do filme da URL atual
 */
export function getMovieSlugFromUrl(pathname: string): string | null {
  const match = pathname.match(/^\/filme\/([^\/]+)$/);
  return match ? match[1] : null;
}

/**
 * Verifica se a URL atual é de um filme
 */
export function isMovieUrl(pathname: string): boolean {
  return pathname.startsWith('/filme/');
}

/**
 * Gera o histórico de navegação para voltar
 */
export function getNavigationHistory(): string[] {
  try {
    const history = sessionStorage.getItem('soflix_navigation_history');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

/**
 * Adiciona uma página ao histórico de navegação
 */
export function addToNavigationHistory(path: string): void {
  try {
    const history = getNavigationHistory();
    
    // Não adicionar se for a mesma página
    if (history[history.length - 1] !== path) {
      history.push(path);
      
      // Manter apenas os últimos 10 itens
      if (history.length > 10) {
        history.shift();
      }
      
      sessionStorage.setItem('soflix_navigation_history', JSON.stringify(history));
    }
  } catch {
    // Falha silenciosa para não interromper a experiência do usuário
  }
}

/**
 * Obtém a página anterior do histórico
 */
export function getPreviousPage(): string | null {
  const history = getNavigationHistory();
  return history.length > 1 ? history[history.length - 2] : null;
}

/**
 * Remove a página atual do histórico (usado quando navega para trás)
 */
export function removeCurrentFromHistory(): void {
  try {
    const history = getNavigationHistory();
    if (history.length > 0) {
      history.pop();
      sessionStorage.setItem('soflix_navigation_history', JSON.stringify(history));
    }
  } catch {
    // Falha silenciosa para não interromper a experiência do usuário
  }
}

/**
 * Limpa o histórico de navegação
 */
export function clearNavigationHistory(): void {
  try {
    sessionStorage.removeItem('soflix_navigation_history');
  } catch {
    // Falha silenciosa para não interromper a experiência do usuário
  }
}