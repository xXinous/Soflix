// Tipos principais da aplicação
export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  romanticDescription: string;
  year: number;
  rating: string;
  specialPhotos?: string[];
}

export interface TimeElapsed {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type PageType = 'home' | 'series' | 'movies' | 'mylist';
export type UserType = 'sofia' | 'admin' | null;

export interface AppState {
  selectedMovie: Movie | null;
  showBannedGenres: boolean;
  currentPage: PageType;
  currentUser: UserType;
  showMobileMenu: boolean;
  timeElapsed: TimeElapsed;
}

// Props para componentes
export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export interface UserSelectionProps {
  onUserSelect: (user: UserType) => void;
}

export interface AdminDashboardProps {
  onBack: () => void;
}

export interface NetflixCategoriesProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

// Props para páginas
export interface PageProps {
  onBack: () => void;
}

// Configurações
export interface AppConfig {
  firstDate: string;
  serverPort: number;
  buildTarget: string;
}
