import photo from '../../images/me.jpg';
import './AboutMe.css';
import { NavLink } from 'react-router-dom';

function AboutMe() {
  return (
    <section className="aboutme" aria-label="Информация обо мне" id= "aboutme">
      <div className="aboutme__content">
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__profile">
          <div className="aboutme__data">
            <div className="aboutme__about">
              <h3 className="aboutme__name">Алексей</h3>
              <p className="aboutme__brief">Начинающий фронтэнд-разработчик, 21 год</p>
              <p className="aboutme__biography">Живу в Красногорске. 
              Студент РосНОУ по специальности связанной с IT, но поработать в этой области не довелось.
              Я люблю смотреть фильмы, слушать музыку и заниматься в спортзале. 
              Фронтэнд-разработка и программирование интересны ещё с школьных времен, и я хочу 
              актуализировать свои знания и развиваться в этом направлении.</p>
            </div>
            <NavLink to="https://github.com/LEH1CH" className="aboutme__link link-transparency" target="_blank">Github</NavLink>
          </div>
          <img src={photo} className="aboutme__photo" alt="Моё фото на фоне гор" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;