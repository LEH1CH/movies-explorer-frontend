import { moviesExplorerApiConfig } from './constants.js';

class MainApi {
  constructor({
    server,
    registerPath,
    loginPath,
    authCheckPath,
    profileDataPath,
    moviesDataPath,
  }) {
    this._server = server;
    this._registerPath = registerPath;
    this._loginPath = loginPath;
    this._authCheckPath = authCheckPath;
    this._profileDataPath = profileDataPath;
    this._moviesDataPath = moviesDataPath;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message) {
    return fetch(path, message).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  //Метод регистрации пользователя
  register({ name, email, password }) {
    const path = this._server + this._registerPath;
    const message = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод авторизации пользователя
  login({ email, password }) {
    const path = this._server + this._loginPath;
    const message = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод проверки авторизации пользователя
  authCheck(token) {
    const path = this._server + this._authCheckPath;
    return this._requestServer(path, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  //Метод формирования запроса для изменения данных профиля
  modifyProfileData({ name, email }, token) {
    const path = this._server + this._profileDataPath;
    const message = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса базы карточек
  getSavedMovies(token) {
    const path = this._server + this._moviesDataPath;
    return this._requestServer(path, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  //Метод формирования запроса на добавление фильма
  addSavedMovie(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    },
    token
  ) {
    const path = this._server + this._moviesDataPath;
    const message = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для удаления карточки
  deleteSavedMovie({ movieId }, token) {
    const path = this._server + this._moviesDataPath + `/${movieId}`;
    console.log(path);
    const message = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return this._requestServer(path, message);
  }
}

const mainApi = new MainApi(moviesExplorerApiConfig);

export default mainApi;
