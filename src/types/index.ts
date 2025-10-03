// Tipos principais da aplicação
export interface Movie {
  id: string;
  title: string;
  image: string;
  genre: string;
  romanticDescription: string;
  year: number;
  rating: string;
  specialPhotos?: string[];
  specialPhotoCaptions?: string[];
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

export interface MovieCategory {
  id: string;
  title: string;
  description?: string;
  movieIds: string[];
  displayOrder: number;
  isActive: boolean;
}

export interface CategoryConfig {
  categories: MovieCategory[];
}
export type UserType = 'sofia' | 'marcelo' | 'admin' | null;

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

