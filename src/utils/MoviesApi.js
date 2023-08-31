import { beatfilmMoviesApiConfig } from './constants.js';

class MoviesApi {
  constructor({ server }) {
    this._server = server;
    this._controller = new AbortController();
    this._signal = this._controller.signal;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message) {
    // Отменяем предыдущий запрос
    this._controller.abort();
    // Создаем новый контроллер
    this._controller = new AbortController();
    this._signal = this._controller.signal;

    return fetch(path, { ...message, signal: this._signal }).then((res) => {
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
