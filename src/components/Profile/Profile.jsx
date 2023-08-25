import './Profile.css';
import React from 'react';
import { useValidation } from "../../hooks/useValidation";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm} = useValidation();
  const currentUser = React.useContext(CurrentUserContext);
  const [isDataModified, setIsDataModified] = React.useState('false');
    
  //Установка в инпуты значений из currentUser
  React.useEffect(()=>{
    resetForm({name:currentUser.name, email:currentUser.email},{name:'', email:''}, false);
  },[, currentUser]);

  //Проверка отличаются ли данные в инпутах от данных из currentUser
  React.useEffect(()=>{
    if((values.name!==currentUser.name)||(values.email!==currentUser.email))
      setIsDataModified(true);
    else
      setIsDataModified(false);
  },[values]);

  //Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();
    props.updateUserData({ name:values.name, email:values.email });
  }

  return (
    <main className="main">
      <section className="profile" aria-label="Страница редактирования данных профиля пользователя">
        <form className="profile__content" onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет {currentUser.name}!</h1>
          <ul className="profile__data">
            <li className="profile__item">
              <fieldset className="profile__item-content">
                <label className="profile__item-name">Имя</label>
                <input type="text" value={values.name ? values.name : "" } onChange={ handleChange } className={ `profile__input ${errors.name && "profile__input_type_error"}` } name="name" placeholder="Имя" disabled={ props.fetching } required minLength="2" maxLength="40" aria-label="Имя пользователя" autoComplete="new-password" />
              </fieldset>
              <span className={ `profile__input-error ${!isValid ? "profile__input-error_visible" : "" }`}>{errors.name}</span>
            </li>
            <li className="profile__item">
              <fieldset className="profile__item-content">
                <label className="profile__item-name">E-mail</label>
                <input type="email" value={ values.email ? values.email : "" } onChange={ handleChange } className={ `profile__input ${errors.email && "profile__input_type_error"}` } name="email" placeholder="Адрес электронной почты" disabled={ props.fetching } required minLength="2" maxLength="40" pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$" aria-label="Адрес электронной почты" autoComplete="new-password" />
              </fieldset>
              <span className={ `profile__input-error ${!isValid ? "profile__input-error_visible" : "" }` }>{ errors.email }</span>
            </li>
          </ul>
          <button type="submit" className={ `profile__save-button ${(isValid && isDataModified && !props.fetching) ? "link-transparency" : "profile__save-button_type_inactive"}` } disabled={ !(isValid && isDataModified) || props.fetching } >Редактировать</button>
          <button type="button" className="profile__exit-button link-transparency" onClick={ props.logout }>Выйти из аккаунта</button>
        </form>
      </section>
    </main>
  );
}

export default Profile;