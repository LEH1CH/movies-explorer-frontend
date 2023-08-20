import './Portfolio.css';
import {NavLink} from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio" aria-label="Моё портфолио">
      <div className="portfolio__content">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <NavLink to="https://github.com/LEH1CH/how-to-learn" className="portfolio__link link-transparency" target="_blank">
              <span className="portfolio__item-name">Статичный сайт</span>
              <span className="portfolio__arrow" />
            </NavLink>
          </li>
          <li className="portfolio__item">
            <NavLink to="https://github.com/LEH1CH/russian-travel-1" className="portfolio__link link-transparency" target="_blank">
              <span className="portfolio__item-name">Адаптивный сайт</span>
              <span className="portfolio__arrow" />
            </NavLink>
          </li>
          <li className="portfolio__item">
            <NavLink to="https://github.com/LEH1CH/react-mesto-api-full-gha" className="portfolio__link link-transparency" target="_blank">
              <span className="portfolio__item-name">Одностраничное приложение</span>
              <span className="portfolio__arrow" />
            </NavLink>
          </li>                
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;