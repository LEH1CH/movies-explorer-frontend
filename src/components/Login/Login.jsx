import logo from '../../images/logo.svg';
import './Login.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";

function Login(props) {

  const { values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm } = useValidation();

  React.useEffect(()=>{
    resetForm({email:'', password:''},{email:'', password:''}, false);
  },[]);

  function handleSubmit(e) {
    e.preventDefault();
    props.login({ email:values.email, password:values.password });
  } 

  return (
    <main className="main">
      <section className="login" aria-label="Вход в аккаунт">
        <div className="login__content">
          <form className="login__form" name="login-form" onSubmit={handleSubmit}>
            <NavLink to="/" className="link-transparency"><img src={logo} className="login__logo" alt="лого сайта" /></NavLink>
            <h1 className="login__title">{props.title}</h1>
            <fieldset className="login__fieldset">
              <label className="login__fieldset-name">E-mail</label>
              <input type="email" onChange={handleChange} className={`login__input ${errors.email && "login__input_type_error"}`} placeholder="Адрес электронной почты" name="email" disabled={ props.fetching } required minLength="2" maxLength="40" pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$" autoComplete="new-password" />
              <span className={`login__input-error ${!isValid ? "login__input-error_visible" : "" }`}>{errors.email}</span>
            </fieldset>
            <fieldset className="login__fieldset">
              <label className="login__fieldset-name">Пароль</label>
              <input type="password" onChange={handleChange} className={`login__input ${errors.password && "login__input_type_error"}`} placeholder="Пароль" name="password" disabled={ props.fetching } required minLength="4" maxLength="40" autoComplete="new-password" />
              <span className={`login__input-error ${!isValid ? "login__input-error_visible" : "" }`}>{errors.password}</span>
            </fieldset>
            <button type="submit" className={`login__submit-button ${!isValid || props.fetching ? "login__submit-button_inactive" : "button-transparency"}`} name="submitBtn" disabled={!isValid || props.fetching}>{props.submitBtnCap}</button>
              <span className="login__span-text">Ещё не зарегистрированы? <NavLink to="/signup" className="login__link link-transparency">Регистрация</NavLink></span>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;