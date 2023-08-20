import './Footer.css';
import { NavLink } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__credentials">
          <span className="footer__copyright">&copy; {currentYear}</span>
          <ul className="footer__nav-links">
            <li><NavLink to="https://practicum.yandex.ru" className="footer__nav-link link-transparency" target="_blank">Яндекс.Практикум</NavLink></li>
            <li><NavLink to="https://github.com" className="footer__nav-link link-transparency" target="_blank">Github</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;