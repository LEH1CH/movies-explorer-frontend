import { beatfilmMoviesApiConfig } from './constants.js';

class MoviesApi {
  constructor({ server }) {
    this._server = server;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message) {
    return fetch(path, message).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  //Метод формирования запроса базы карточек
  getInitialMovies() {
    return this._requestServer(this._server);
  }
}
const moviesApi = new MoviesApi(beatfilmMoviesApiConfig);

export default moviesApi;
