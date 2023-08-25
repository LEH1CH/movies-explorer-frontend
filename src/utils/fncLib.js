import { beatfilmMoviesApiConfig } from './constants.js';

const { baseUrl } = beatfilmMoviesApiConfig;

export function movieDataFormatConverter(data) {
  return {
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: baseUrl + data.image.url,
    trailerLink: data.trailerLink,
    thumbnail: baseUrl + data.image.formats.thumbnail.url,
    movieId: data.id,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    saved: false,
  };
}

export function checkQuery(str) {
  if (str.trim().length) return true;
  return false;
}

//поиск в названиях фильмов по строке
export function searchMovies(moviesArray, str) {
  const target = str.trim().toLowerCase();
  return moviesArray.filter((el) => {
    return (
      el.nameRU.trim().toLowerCase().indexOf(target) !== -1 ||
      el.nameEN.trim().toLowerCase().indexOf(target) !== -1
    );
  });
}

//устанавливает сохранённым фильмам свойство saved в true
export function updateSavedMovies(moviesArray, savedArray) {
  if (!moviesArray.length) return moviesArray;
  const listOfSaved = savedArray.map((el) => el.movieId);
  return moviesArray.map((el) => {
    return { ...el, saved: listOfSaved.includes(el.movieId) };
  });
}
