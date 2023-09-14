import logo from '../../images/logo.svg';
import './Register.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";

function Register(props) {

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm} = useValidation();

  React.useEffect(()=>{
      resetForm({name: '', email:'', password:''},{name:'', email:'', password:''}, false);
  },[,props.title]);

  function handleSubmit(e) {
    e.preventDefault();
    props.register({ name:values.name, email:values.email, password:values.password }); 
  } 

  return (
    <main className="main">
      <section className="register" aria-label="Регистрация нового пользователя">
        <div className="register__content">
          <form className="register__form" name="register-form" onSubmit={handleSubmit}>
            <NavLink to="/" className="link-transparency"><img src={logo} className="register__logo" alt="лого сайта" /></NavLink>
            <h1 className="register__title">{props.title}</h1>
            <fieldset className="register__fieldset">
              <label className="register__fieldset-name">Имя</label>
              <input type="text" onChange={handleChange} className={`register__input ${errors.name && "register__input_type_error"}`} placeholder="Имя" name="name" disabled={ props.fetching } required minLength="2" maxLength="40" autoComplete="new-password" />
              <span className={`register__input-error ${!isValid ? "register__input-error_visible" : "" }`}>{errors.name}</span>
            </fieldset>
            <fieldset className="register__fieldset">
              <label className="register__fieldset-name">E-mail</label>
              <input type="email" onChange={handleChange} className={`register__input ${errors.email && "register__input_type_error"}`} placeholder="Адрес электронной почты" name="email" disabled={ props.fetching } required minLength="2" maxLength="40" pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$" autoComplete="new-password" />
              <span className={`register__input-error ${!isValid ? "register__input-error_visible" : "" }`}>{errors.email}</span>
            </fieldset>
            <fieldset className="register__fieldset">
              <label className="register__fieldset-name">Пароль</label>
              <input type="password" onChange={handleChange} className={`register__input ${errors.password && "register__input_type_error"}`} placeholder="Пароль" name="password" disabled={ props.fetching } required minLength="4" maxLength="40" autoComplete="new-password" />
              <span className={`register__input-error ${!isValid ? "register__input-error_visible" : "" }`}>{errors.password}</span>
            </fieldset>
            <button type="submit" className={`register__submit-button ${!isValid || props.fetching ? "register__submit-button_inactive" : "button-transparency"}`} name="submitBtn" disabled={!isValid || props.fetching}>{props.submitBtnCap}</button>
              <span className="register__span-text">Уже зарегистрированы? <NavLink to="/signin" className="register__link link-transparency">Войти</NavLink></span>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;