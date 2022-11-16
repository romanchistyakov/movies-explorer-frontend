import React from "react";
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__border"></div>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav className="footer__links">
          <a href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer" className="footer__link hover-link">Яндекс.Практикум</a>
          <a href="https://github.com/romanchistyakov/movies-explorer-frontend" target="_blank" rel="noopener noreferrer" className="footer__link hover-link">Github</a>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;