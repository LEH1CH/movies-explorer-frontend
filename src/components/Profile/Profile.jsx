import './Profile.css';
import React from 'react';
import { useNavigate} from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm} = useValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(()=>{
    resetForm({name:currentUser.name, email:currentUser.email},{name:'', email:''}, false);
  },[]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    props.updateUserData(values.name, values.email);
  }

  function handleLogout() {
    props.logout();
  }

  return (
    <main className="main">
      <section className="profile" aria-label="Страница редактирования данных профиля пользователя">
        <form className="profile__content" onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет Алексей!</h1>
          <ul className="profile__data">
            <li className="profile__item">
              <fieldset className="profile__item-content">
                <label className="profile__item-name">Имя</label>
                <input type="text" value={values.name ? values.name : ""} onChange={handleChange} className={`profile__input ${errors.name && "profile__input_type_error"}`} name="name" placeholder="Имя" required minLength="2" maxLength="40" aria-label="Имя пользователя"/>
              </fieldset>
              <span className={`profile__input-error ${!isValid ? "profile__input-error_visible" : "" }`}>{errors.name}</span>
            </li>
            <li className="profile__item">
              <fieldset className="profile__item-content">
                <label className="profile__item-name">E-mail</label>
                <input type="email" value={values.email ? values.email : ""} onChange={handleChange} className={`profile__input ${errors.email && "profile__input_type_error"}`} name="email" placeholder="Адрес электронной почты" required minLength="2" maxLength="40" aria-label="Адрес электронной почты"/>
              </fieldset>
              <span className={`profile__input-error ${!isValid ? "profile__input-error_visible" : "" }`}>{errors.email}</span>
            </li>
          </ul>
          <button type="submit" className={`profile__save-button ${isValid ? "link-transparency" : "profile__save-button_type_inactive"}`} disabled={!isValid} >Редактировать</button>
          <button type="button" className="profile__exit-button link-transparency" onClick={handleLogout}>Выйти из аккаунта</button>
        </form>
      </section>
    </main>
  );
}

export default Profile;