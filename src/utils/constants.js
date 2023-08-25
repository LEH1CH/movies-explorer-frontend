//продолжительность короткометражки
export const SHORT = 40;
export const FILMS_TO_SHOW_4_COLS = 12;
export const FILMS_TO_ADD_4_COLS = 6;
export const FILMS_TO_SHOW_3_COLS = 8;
export const FILMS_TO_ADD_3_COLS = 4;
export const FILMS_TO_SHOW_2_COLS = 8;
export const FILMS_TO_ADD_2_COLS = 2;
export const FILMS_TO_SHOW_1_COL = 5;
export const FILMS_TO_ADD_1_COL = 2;
export const MAX_WINDOW_WIDTH_3_COLS = 800;
export const MAX_WINDOW_WIDTH_2_COLS = 500;
export const MAX_WINDOW_WIDTH_1_COL = 350;

//Данные для api связи с сервером Beatfilm
export const beatfilmMoviesApiConfig = {
  server: 'https://api.nomoreparties.co/beatfilm-movies',
  baseUrl: 'https://api.nomoreparties.co/',
};

//Данные для api связи с сервером moviesExplorer
export const moviesExplorerApiConfig = {
  server: 'https://api.leh1ch-diploma.nomoreparties.co',
  registerPath: '/signup',
  loginPath: '/signin',
  authCheckPath: '/users/me',
  profileDataPath: '/users/me',
  moviesDataPath: '/movies',
};
