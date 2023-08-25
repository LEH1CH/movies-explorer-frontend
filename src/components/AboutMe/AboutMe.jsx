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
              <p className="aboutme__biography">Я родился и живу в Красногорске, Студент РосНОУ по направлению информационные системы и технологии. Я люблю слушать музыку, смотреть сериалы, а ещё заниматься в спортзале. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.</p>
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