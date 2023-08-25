import './App.css';
import React from 'react';
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoToolTip from '../InfoToolTip/InfoTooltip';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi.js';
import Preloader from '../Preloader/Preloader';

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  //Стейт с данными пользователя
  const [currentUser, setCurrentUser] = React.useState({ 
    name: '', 
    email: '', 
    _id: '',
    token: ''
  });
  //Массив сохранённых фильмов
  const [savedMovies, setSavedMovies] = React.useState([]);
  //Залогинен ли пользователь
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //Данные информационного попапа
  const [infoTooltip, setInfoTooltip] = React.useState({ 
    isInfoTooltipOpened:false,
    tooltipMessage:"",
    toolTipState:false
  });
  //Состояние бургера
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  //Текущая страница
  const [page, setPage] = React.useState('');
  //Стейт загрузки страницы. Используется для отключения защиты роутов во время проверки токена
  const [isLoading, setIsLoading] = React.useState(true);
  //Стейт работы запроса. Используется для блокировки элементов и повторных запросов во время выполнения запроса
  const [isFetching, setIsFetching] = React.useState(false);
  
  //Определяем текущую страницу
  React.useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  //Проверяем аутентифицирован ли пользователь
  React.useEffect(() => {
    handleAuthCheck();
  }, [])

  //Обработчик закрытия попапов и бургера
  function closeAllPopups() {
    setInfoTooltip({ ...infoTooltip, isInfoTooltipOpened:false });
    setIsBurgerOpen(false);
  }

  //Обработчик нажатия на кнопку бургера
  function handleBurgerClick(currentState) {
    currentState
      ? setIsBurgerOpen(false)
      : setIsBurgerOpen(true);
  }

  //Открытие модалки с сообщением
  function showInfoTooltip(message, isOk) {
    setInfoTooltip({    
      isInfoTooltipOpened: true,
      tooltipMessage: message,
      toolTipState: isOk
    });
  }

  //Обработчик регистрации нового пользователя на сервере  
  function handleRegisterSubmit( newUserData ) {
    setIsFetching(true);
    mainApi.register(newUserData)
      .then((data) => {
        showInfoTooltip(`Регистрация прошла успешно!`, true);
        handleLoginSubmit({ email:newUserData.email, password:newUserData.password }, true);
      })
      .catch((err) => {
        err.then(({message}) => {
          showInfoTooltip(`Не удалось зарегистрировать пользователя! Ошибка: ${message}`, false);
          setIsFetching(false);
        })
      })
    }

  //Обработчик авторизации пользователя на сервере
  function handleLoginSubmit( userData , dontDisableFetch = false) {
    setIsFetching(true);
    mainApi.login(userData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        handleAuthCheck();
      })
      .catch((err) => {
        err.then(({message}) => {
          showInfoTooltip(`Не удалось войти в систему! Ошибка: ${message}`, false);
          setIsFetching(false);
        })
      })
  }

  //Обработчик проверки выполненной авторизации
  function handleAuthCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      mainApi.authCheck(jwt)
        .then(({data}) => {
          setIsLoggedIn(true);
          setCurrentUser({ name: data.name, email: data.email, _id: data._id, token: jwt});
          getSavedMovies(jwt);
          setIsLoading(false);
          setIsFetching(false);
          if((location.pathname === '/signin')||(location.pathname==='/signup')) {
            navigate("/movies", {replace:true});
          }
        })
        .catch((err) => {
          err.then(({message}) => {
            showInfoTooltip(`Не удалось войти в систему! Ошибка: ${message}`, false);
            setIsFetching(false);
          })
        })
    } else {
      setIsLoading(false);
    }
  }     

 //Обработчик сохранения новых данных пользователя на сервере
 function handleUpdateUserData(newUserData) {
  setIsFetching(true);
  mainApi.modifyProfileData(newUserData, currentUser.token)
    .then(({ data }) => {
      setCurrentUser({...currentUser, name: data.name, email: data.email });
      showInfoTooltip(`Данные профиля успешно изменены!`, true);
    })
    .catch((err) => {
      err.then(({message}) => {
        showInfoTooltip(`Не удалось сохранить новые данные профиля! Ошибка: ${message}`, false);
      })
    })
    .finally(()=>setIsFetching(false));
}

  //Обработчик авторизации пользователя на сервере
  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '', _id: '', token: '' });
    navigate("/", {replace:true});
  }    

  //Получение списка сохранённых фильмов
  function getSavedMovies(jwt) {
    mainApi.getSavedMovies(jwt)
    .then(({data})=>{
      setSavedMovies(data)})
    .catch((err) => {
      err.then(({message}) => {
        showInfoTooltip(`Не удалось загрузить сохранённые фильмы! Ошибка: ${message}`, false);
      })
    })
  }

  //Обработчик клика по кнопке лайка
  function handleLikeClick(movie) {
    setIsFetching(true);
    movie.saved
    ? mainApi.deleteSavedMovie(movie, currentUser.token)
      .then(({data}) => setSavedMovies(savedMovies.filter((el)=>{return el.movieId !== data.movieId})))
      .catch((err) => {
        err.then(({message}) => {
          showInfoTooltip(`Не удалось удалить фильм! Ошибка: ${message}`, false);
        })
      })
      .finally(()=>setIsFetching(false))
    : mainApi.addSavedMovie(movie, currentUser.token)
      .then(({data}) => setSavedMovies([...savedMovies, data]))
      .catch((err) => {
        err.then(({message}) => {
          showInfoTooltip(`Не удалось сохранить фильм! Ошибка: ${message}`, false);
        })
      })
      .finally(()=>setIsFetching(false));
  }

  //Обработчик клика по кнопке удаления карточки
  function handleDeleteClick(movie) {
    setIsFetching(true);
    mainApi.deleteSavedMovie(movie, currentUser.token)
    .then(({data}) => setSavedMovies(savedMovies.filter((el)=>{return el.movieId !== data.movieId})))
      .catch((err) => {
        err.then(({message}) => {
          showInfoTooltip(`Не удалось удалить фильм! Ошибка: ${message}`, false);
        })
      })
    .finally(()=>setIsFetching(false));
  }

  //Если грузится, рисуем прелоадер, если нет - App
  if(isLoading) 
    return (<Preloader />)
  
  return (
    <div className="app">
      <CurrentUserContext.Provider value={ currentUser }>
        {((page==='/')||(page==='/movies')||(page==='/saved-movies')||(page==='/profile')) && 
          (<Header loggedIn={ isLoggedIn } isBurgerOpen={ isBurgerOpen } burgerClick={ handleBurgerClick }/>)}
        
        <Routes>
          <Route path="/signup" element={ 
            <Register 
              submitBtnCap='Зарегистрироваться' 
              register={handleRegisterSubmit} 
              title="Добро пожаловать!" 
              fetching = { isFetching } /> 
            } />

          <Route path="/signin" element={ 
            <Login 
              submitBtnCap='Войти' 
              login={handleLoginSubmit} 
              title="Рады видеть!" 
              fetching = { isFetching } /> 
            } />

          <Route path="/" element={ 
            <Main 
              loggedIn={ isLoggedIn } />
            } />

          <Route path="/profile" element={ 
            <ProtectedRouteElement 
              element={ Profile } 
              updateUserData={ handleUpdateUserData } 
              logout={ handleLogout } 
              loggedIn={ isLoggedIn }
              showInfoTooltip={ showInfoTooltip }
              fetching = { isFetching } /> 
            } />

          <Route path="/movies" element={ 
            <ProtectedRouteElement 
              element={ Movies } 
              loggedIn={ isLoggedIn } 
              handleLikeClick={ handleLikeClick }
              savedMovies = { savedMovies }
              showInfoTooltip={showInfoTooltip} 
              fetching = { isFetching } /> 
          } />

          <Route path="/saved-movies" element={
            <ProtectedRouteElement 
              element={ SavedMovies } 
              loggedIn={ isLoggedIn } 
              handleDeleteClick={ handleDeleteClick }
              savedMovies = { savedMovies }
              showInfoTooltip={showInfoTooltip} 
              fetching = { isFetching } />
          } />

          <Route path="*" element={ 
            <Page404 />
          } />
        </Routes>
      </CurrentUserContext.Provider>
      
      {((location.pathname==='/')||(location.pathname==='/movies')||(location.pathname==='/saved-movies')) && 
        (<Footer />)}
      
      <InfoToolTip 
        isOpen={infoTooltip.isInfoTooltipOpened} 
        isOk={infoTooltip.toolTipState}
        message={infoTooltip.tooltipMessage}
        onClose={closeAllPopups} />
    </div>
  );
}

export default App;