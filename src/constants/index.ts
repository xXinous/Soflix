// Constantes da aplicação
export const APP_CONFIG = {
  FIRST_DATE: '2025-06-14T21:00:00',
  SERVER_PORT: 3000,
  BUILD_TARGET: 'esnext',
} as const;

export const BANNED_GENRES = [
  "Faculdade de Direito",
  "Faculdade a Noite", 
  "Demorar pra responder no ZAP",
  "Não vai da pra gente se ver hoje"
] as const;

export const PROGRESS_VALUES = [75, 45, 65] as const;

export const ROUTES = {
  HOME: 'home',
  SERIES: 'series',
  MOVIES: 'movies',
  MY_LIST: 'mylist',
} as const;

export const USERS = {
  SOFIA: 'sofia',
  ADMIN: 'marcelo',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const STORAGE_CONFIG = {
  USE_SUPABASE: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY,
} as const;

