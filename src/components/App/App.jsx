import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import './App.css';

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

import { films, savedFilms } from '../../utils/dev_const' //Временные данные

/* Заготовка
function handleRegisterSubmit() { };
function handleLoginSubmit() { };
function handleCardSave() { };
function handleCardDelete() { };
*/

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({ 
    name: 'LEH1CH', 
    email: 'qwerty@qwerty.ru', 
    _id: 'qwerty' 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [infoTooltip, setInfoTooltip] = useState({ 
    isInfoTooltipOpened:false,
    tooltipMessage:"",
    toolTipState:false
  });

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState('');

  //Определяем текущую страницу
  React.useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  //Добавляем лисенер нажатия на кнопки для закрытия попапов по Esc 
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscPress);
  }, [])

  //Обработчик нажатия на кнопку Esc
  function handleEscPress(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

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

  //Заглушка обработчика регистрации
  function handleRegister() {
    setInfoTooltip({    
      isInfoTooltipOpened: true,
      tooltipMessage:"Вы успешно зарегистрировались!",
      toolTipState: true
    });
    navigate("/signin", {replace:true});
  }

  //Заглушка обработчика логина
  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/movies", {replace:true});
  }

  //Заглушка обработчика логаута
  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/", {replace:true});
  }

  //Заглушка обработчика редактирования данных пользователя
  function handleUpdateUserData(name, email) {
    setCurrentUser({...currentUser, ['name']: name, ['email']: email})
    setInfoTooltip({    
      isInfoTooltipOpened: true,
      tooltipMessage:"Вы успешно изменили данные профиля!",
      toolTipState: true
    });
    navigate("/movies", {replace:true});
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
      {((location.pathname==='/')||(location.pathname==='/movies')||(location.pathname==='/saved-movies')||(location.pathname==='/profile')) && (<Header loggedIn={isLoggedIn} isBurgerOpen={isBurgerOpen} burgerClick={handleBurgerClick}/>)}

        <Routes>
          <Route path="/signup" element={<Register submitBtnCap='Зарегистрироваться' register={handleRegister} title="Добро пожаловать!" />} />
          <Route path="/signin" element={<Login submitBtnCap='Войти' login={handleLogin} title="Рады видеть!" />} />
          <Route path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route path="*" element={<Page404 prev="/" />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} updateUserData={handleUpdateUserData} logout={handleLogout} loggedIn={isLoggedIn} />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} loggedIn={isLoggedIn} loading={isLoading} listOfMovies={films}/>} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={isLoggedIn} loading={isLoading} listOfMovies={savedFilms}/>} />
        </Routes>
      </CurrentUserContext.Provider>
      
      {((location.pathname==='/')||(location.pathname==='/movies')||(location.pathname==='/saved-movies')) && (<Footer />)}
      
      <InfoToolTip 
        isOpen={infoTooltip.isInfoTooltipOpened} 
        isOk={infoTooltip.toolTipState}
        message={infoTooltip.tooltipMessage}
        onClose={closeAllPopups} />
    </div>
  );
}

export default App;