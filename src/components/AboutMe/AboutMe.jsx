import photo from '../../images/me.jpeg';
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
              <h3 className="aboutme__name">Виталий</h3>
              <p className="aboutme__brief">Фронтэнд-разработчик, 30 лет</p>
              <p className="aboutme__biography">Я родился и живу в Саратове, закончил факультет экономики&nbsp;СГУ. У меня есть жена 
и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по <nobr>веб-разработке,</nobr> начал заниматься <nobr>фриланс-заказами</nobr> и ушёл с постоянной работы.</p>
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