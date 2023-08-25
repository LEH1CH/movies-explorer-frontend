import logo from '../../images/logo.svg';
import './Header.css';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import React from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions.js"

function Header(props) {

  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  // Закрытие бургера и сброс стейта при ширине > 800 пкс
  React.useEffect(function () {
    if (width>1000) {
      props.burgerClick(true);
    }
  }, [width]);

  // Закрытие бургера при переходе по ссылке
  React.useEffect(function () {
    if(props.isBurgerOpen)
      props.burgerClick(true);
  }, [location]);

  // Обработчик закрытия по нажатию Esc
  React.useEffect(() => {
    if (!props.isBurgerOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        props.burgerClick(props.isBurgerOpen);
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [props.isBurgerOpen])

  // Обработчик клика по кнопке бургера
  function handleBurgerClick() {
    props.isBurgerOpen
      ? props.burgerClick(props.isBurgerOpen)
      : props.burgerClick(props.isBurgerOpen);
  }

  return (
    <header className={`header ${location.pathname==="/" ? "header_background_promo" : ""}`}>
      <nav className="header__content">
        <NavLink to="/" className="link-transparency"><img src={logo} className="header__logo" alt="Логотип Movie Explorer" /></NavLink>
        {!props.loggedIn
        ?
          (
            <nav className="header__auth-items">
              <li className="header__auth-item">
                <NavLink to="/signup" className="header__signup link-transparency">Регистрация</NavLink>
              </li>
              <li className="navigation__item">
                <button type="button" className="header__signin-button button-transparency" onClick={()=>{navigate("/signin", {replace:true});}}>Войти</button>
              </li>                
            </nav>
          )
        : width>1000
          ? 
            (
              <div className="header__nav">
                <ul className="header__film-link-items">
                  <li className="header__film-link-item">
                    <NavLink to="/movies" className={`header__film-link ${location.pathname==="/movies" ? "header__film-link_type_active" : "link-transparency"}`}>Фильмы</NavLink>
                  </li>
                  <li className="header__film-link-item">
                    <NavLink to="/saved-movies" className={`header__film-link ${location.pathname==="/saved-movies" ? "header__film-link_type_active" : "link-transparency"}`}>Сохранённые фильмы</NavLink>
                  </li>
                </ul>
                <button type="button" className="header__account-button button-transparency" disabled={ location.pathname==="/profile" ? true : false } onClick={()=>{/*location.pathname==="/profile" ? navigate("/movies", {replace:true}) : */navigate("/profile", {replace:true})}}>Аккаунт</button>
              </div>
            )
          : 
            props.isBurgerOpen
              ? 
                ( 
                  <div className="header__nav header__nav_type_burger">
                    <div className="header__burger-background" onMouseDown={ () => {props.burgerClick(props.isBurgerOpen)} }>
                      <nav className="header__burger-menu" onMouseDown={ (e)=>{e.stopPropagation()} }>
                        <button type="button" className="header__burger-button header__burger-button_type_close button-transparency" onClick={handleBurgerClick}/>
                        <ul className="header__film-link-items header__film-link-items_type_burger">
                          <li className="header__film-link-item">
                            <NavLink to="/" className={`header__film-link ${location.pathname==="/" ? "header__film-link_type_active" : "link-transparency"}`}>Главная</NavLink>
                          </li>
                          <li className="header__film-link-item">
                            <NavLink to="/movies" className={`header__film-link ${location.pathname==="/movies" ? "header__film-link_type_active" : "link-transparency"}`}>Фильмы</NavLink>
                          </li>
                          <li className="header__film-link-item">
                            <NavLink to="/saved-movies" className={`header__film-link ${location.pathname==="/saved-movies" ? "header__film-link_type_active" : "link-transparency"}`}>Сохранённые фильмы</NavLink>
                          </li>
                        </ul>
                        <button type="button" className="header__account-button button-transparency" disabled={ location.pathname==="/profile" ? true : false } onClick={()=>{/*location.pathname==="/profile" ? navigate("/movies", {replace:true}) : */navigate("/profile", {replace:true})}}>Аккаунт</button>
                      </nav>
                    </div>
                  </div>
                )
              : 
                (
                  <div className="header__nav header__nav_type_burger">
                    <button type="button" className="header__burger-button button-transparency" onClick={handleBurgerClick}/>
                  </div>
                )
        }
      </nav>
    </header>
  );
}

export default Header;